import { useState } from 'react';
import { Card, Input, Form, Typography, notification, Table, Modal, Timeline } from 'antd';
import { reportTheftIncident, getCycleTrackingData } from './utils';
import type { CycleTrackingData, TheftIncident } from './types';
import ActionButton from '@components/ActionButton';

const { Title, Text } = Typography;
export default function TheftTracking() {
  const [trackForm] = Form.useForm();
  const [incidentForm] = Form.useForm();
  const [incidents, setIncidents] = useState<TheftIncident[]>([]);
  const [trackingData, setTrackingData] = useState<CycleTrackingData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cycleIdToTrack, setCycleIdToTrack] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [isTrackingModalVisible, setIsTrackingModalVisible] = useState(false);
  const [selectedCycleIdForTracking, setSelectedCycleIdForTracking] = useState<string>('');
  const incidentColumns = [
    {
      title: 'Incident ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Cycle ID',
      dataIndex: 'cycleId',
      key: 'cycleId',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Report Date',
      dataIndex: 'reportDate',
      key: 'reportDate',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => text || 'N/A',
    },
    // {
    //   title:'Action',
    //   key:'action',
    //   dataIndex:'id',
    //   className:'text-center',
    //   render(value,record){
    //     return (
    //       <Space>
    //         <ActionButton
    //         />
    //       </Space>
    //     )
    //   }
    // }
  ];



  const handleReportTheft = async (values: any) => {
    setShowModal(false)
    setLoading(true);
    try {
      const newIncident = await reportTheftIncident({
        cycleId: values.cycleId,
        reporterId: 'currentUser123',
        location: { latitude: 0, longitude: 0 },
        description: values.description,
      });
      setIncidents((prev) => [...prev, newIncident]);
      notification.success({
        message: 'Theft Reported',
        description: `Incident for Cycle ID ${newIncident.cycleId} has been reported.`,
      });
      incidentForm.resetFields();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to report theft incident.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTrackCycle = async (values: { cycleIdToTrack: string }) => {
    if (!values.cycleIdToTrack) {
      notification.warning({
        message: 'Warning',
        description: 'Please enter a Cycle ID to track.',
      });
      return;
    }
    setLoading(true);
    try {
      const data = await getCycleTrackingData(values.cycleIdToTrack);
      setTrackingData(data);
      setSelectedCycleIdForTracking(values.cycleIdToTrack);
      setIsTrackingModalVisible(true);
      notification.success({
        message: 'Tracking Data Fetched',
        description: `Tracking data for Cycle ID ${values.cycleIdToTrack} retrieved.`,
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch tracking data.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title level={2}>Theft Tracking System</Title>
      <Form
        layout="vertical"
        form={trackForm}
        onFinish={handleTrackCycle}
        className="d-grid grid-auto column-gap-2 align-items-end"
      >
        <Form.Item
          name="cycleIdToTrack"
          rules={[{ required: true, message: 'Please enter Cycle ID' }]}
        >
          <Input
            placeholder="Enter Cycle ID to Track"
            value={cycleIdToTrack}
            onChange={(e) => setCycleIdToTrack(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <ActionButton
            onAdd={() => setShowModal(true)} addTitle='Add Incident'
            onSearch={trackForm.submit} searchTitle="Track Cycle"
          />
        </Form.Item>
      </Form>
      <Modal
        title={`Tracking Data for Cycle ID: ${selectedCycleIdForTracking}`}
        open={isTrackingModalVisible}
        onCancel={() => setIsTrackingModalVisible(false)}
        footer={null}
        width={800}
      >
        {trackingData.length > 0 ? (
          <Timeline mode="left">
            {trackingData.map((item, index) => (
              <Timeline.Item key={index} label={new Date(item.timestamp).toLocaleString()}>
                <Text strong>Location:</Text> Latitude {item.location.latitude}, Longitude {item.location.longitude}<br />
                <Text strong>Speed:</Text> {item.speed} km/h
              </Timeline.Item>
            ))}
          </Timeline>
        ) : (
          <Text>No tracking data available for this cycle ID.</Text>
        )}
      </Modal>

      <Card title="Recent Theft Incidents">
        <Table loading={loading}
          columns={incidentColumns}
          dataSource={incidents}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
      <Modal
        title="Report a Theft Incident"
        destroyOnClose
        open={showModal}
        onCancel={() => setShowModal(false)}
        afterClose={() => incidentForm.resetFields()}
        onOk={() => incidentForm.submit()}
        okText="Report Theft"
      >
        <Form form={incidentForm} layout="vertical" onFinish={handleReportTheft}>
          <Form.Item
            name="cycleId"
            label="Cycle ID"
            rules={[{ required: true, message: 'Please input the Cycle ID!' }]}
          >
            <Input placeholder="Enter Cycle ID" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} placeholder="Provide details about the theft" />
          </Form.Item>
          {/* <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Report Theft
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
}



