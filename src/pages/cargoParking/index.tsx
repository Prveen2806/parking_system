import { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';

import { ParkingGrid } from '@components/parking/ParkingGrid';
import { ParkingStats } from '@components/parking/ParkingStats';
import Title from 'antd/es/typography/Title';
import { useParking } from '@hooks/useParking';
import type { ParkingSlot, User } from '@pages/cycleParking/types';
import { QRCodeDisplay } from '@components/QRCodeDisplay';

export default function CargoParking() {
  const {
    floors,
    selectedFloor,
    setSelectedFloor,
    parkVehicle,
    vacateSlot,
    getSlotsByFloor
  } = useParking();

  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null); // State for QR code data
  const [qrModalVisible, setQrModalVisible] = useState(false); // State for QR code modal
  const [form] = Form.useForm();

  const cargoFloors = floors.filter(floor => floor.type === 'cargo');

  const initialCargoFloor = cargoFloors.length > 0 ? cargoFloors[0].number : 1;
  const currentCargoFloor = cargoFloors.find(floor => floor.number === selectedFloor) ? selectedFloor : initialCargoFloor;

  const currentSlots = getSlotsByFloor(currentCargoFloor);

  const selectedFloorData = floors.find(floor => floor.number === currentCargoFloor);

  const totalSlots = selectedFloorData?.totalSlots || 0;
  const occupiedSlots = selectedFloorData?.occupiedSlots || 0;
  const revenue = 6000.00; // Mock revenue for cargo parking
  const securityIncidents = 1;
  const availableValets = 1;

  const handleSlotClick = (slot: ParkingSlot) => {
    setSelectedSlot(slot);

    if (slot.status === 'free') {
      setModalVisible(true);
    } else if (slot.status === 'occupied') {
      Modal.confirm({
        title: 'Vacate Parking Slot',
        content: `Do you want to free up slot ${slot.id}?`,
        onOk: () => {
          vacateSlot(slot.id);
          message.success(`Slot ${slot.id} has been freed`);
        },
      });
    }
  };

  const handleParkVehicle = async (values: any) => {
    if (!selectedSlot) return;

    const user: User = {
      id: Date.now().toString(),
      name: values.name,
      email: values.email,
      verified: true,
      vehicleRegistration: values.vehicleRegistration,
      contactNumber: values.contactNumber,
    };

    parkVehicle(selectedSlot.id, user, [selectedSlot.vehicleType]);

    const dataToEncode = JSON.stringify({
      slotId: selectedSlot.id,
      vehicleRegistration: user.vehicleRegistration,
      userId: user.id,
      parkedAt: new Date().toISOString(),
    });
    setQrCodeData(dataToEncode);
    setQrModalVisible(true); // Show QR code modal

    message.success(`Vehicle parked successfully in slot ${selectedSlot.id}`);
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Title level={2} style={{ marginBottom: '8px' }}>Cargo Parking Management</Title>
        <p style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
          100,000 sq ft facility with 20 cargo parking slots per floor and 3 gates
        </p>
      </div>

      <ParkingStats
        totalSlots={totalSlots}
        occupiedSlots={occupiedSlots}
        revenue={revenue}
        securityIncidents={securityIncidents}
        availableValets={availableValets}
        vehicleType="cargo"
      />

      <ParkingGrid
        slots={currentSlots}
        title={`Cargo Parking - Floor ${currentCargoFloor}`}
        onSlotClick={handleSlotClick}
        selectedFloor={currentCargoFloor}
        onFloorChange={setSelectedFloor}
        floors={cargoFloors}
        floorType="cargo"
      />

      <Modal
        title={`Park Vehicle in Slot ${selectedSlot?.id}`}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleParkVehicle}
          style={{ marginTop: '16px' }}
        >
          <Form.Item
            name="name"
            label="Customer Name"
            rules={[{ required: true, message: 'Please enter customer name' }]}
          >
            <Input placeholder="Enter customer name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter valid email' }
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            name="vehicleRegistration"
            label="Vehicle Registration"
            rules={[{ required: true, message: 'Please enter vehicle registration' }]}
          >
            <Input placeholder="Enter vehicle registration number" />
          </Form.Item>

          <Form.Item
            name="contactNumber"
            label="Contact Number"
            rules={[{ required: true, message: 'Please enter contact number' }]}
          >
            <Input placeholder="Enter contact number" />
          </Form.Item>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button onClick={() => setModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Park Vehicle
            </Button>
          </div>
        </Form>
      </Modal>

      {qrCodeData && selectedSlot && (
        <Modal
          title="Parking QR Code"
          open={qrModalVisible}
          onCancel={() => setQrModalVisible(false)}
          footer={null}
          width={400}
          centered
        >
          <QRCodeDisplay data={qrCodeData} slotId={selectedSlot.id} />
        </Modal>
      )}
    </div>
  );
}
