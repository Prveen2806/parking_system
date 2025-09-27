import { useState } from 'react';
import {  Button,  Modal, Form, Input, App, Radio } from 'antd';

import { ParkingGrid } from '@components/parking/ParkingGrid';
import { ParkingStats } from '@components/parking/ParkingStats';
import Title from 'antd/es/typography/Title';
import { useParking } from '@hooks/useParking';
import type { ParkingSlot, User } from './types';
import { QRCodeDisplay } from '@components/QRCodeDisplay'; // Import QRCodeDisplay
import { getUserByEmail } from '@pages/valetManagement/utils';


export default function CycleParking() {
  const [modalVisible, setModalVisible] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [parkingType, setParkingType] = useState<'normal' | 'valet'>('normal'); // New state for parking type

  const {  floors, selectedFloor, setSelectedFloor, getSlotsByFloor, parkVehicle, vacateSlot, getFloorDetails } = useParking();
  const { modal, message } = App.useApp();

  const handleSlotClick = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
    if (slot.status === 'free') {
      setModalVisible(true);
    } else if (slot.status === 'occupied') {
      console.log('Occupied slot clicked:', slot);
      modal.confirm({
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
    setModalVisible(false);

    if (parkingType === 'valet') {
      const existingUser = await getUserByEmail(values.email);
      if (!existingUser || !existingUser.verified) {
          message.error('User is not verified. Please complete the verification process to park your vehicle');
        return;
      }
    }

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

  const cycleFloors = floors.filter(floor => floor.type === 'cycle');
  const currentSlots = getSlotsByFloor(selectedFloor);

  const selectedFloorData = getFloorDetails(selectedFloor);

  const totalSlots = selectedFloorData?.totalSlots || 0;
  const occupiedSlots = selectedFloorData?.occupiedSlots || 0;
  const revenue = 1250.50; // Mock revenue for cycle parking
  const securityIncidents = 0;
  const availableValets = 8;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Title level={2} style={{ marginBottom: '8px' }}>Cycle Parking Management</Title>
        <p style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
          24,000 sq ft facility with 480 cycle parking slots per floor
        </p>
      </div>

      <ParkingStats
        totalSlots={totalSlots}
        occupiedSlots={occupiedSlots}
        revenue={revenue}
        securityIncidents={securityIncidents}
        availableValets={availableValets}
        vehicleType="cycle"
      />

      <ParkingGrid
        slots={currentSlots}
        title={`Cycle Parking - Floor ${selectedFloor}`}
        onSlotClick={handleSlotClick}
        selectedFloor={selectedFloor || 7}
        onFloorChange={setSelectedFloor}
        floors={cycleFloors}
        floorType="cycle"
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
          <Form.Item label="Parking Type">
            <Radio.Group onChange={(e) => setParkingType(e.target.value)} value={parkingType}>
              <Radio value="normal">Normal Parking</Radio>
              <Radio value="valet">Valet Parking</Radio>
            </Radio.Group>
          </Form.Item>
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