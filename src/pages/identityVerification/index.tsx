import { useState, useEffect } from 'react';
import { Button, notification, Typography, Table, Tag, Space, Modal, Form } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { UserVerificationRequest } from './types';
import { fetchUserVerificationRequests, updateUserVerificationStatus } from './utils';
import VerificationForm from './verificationForm/verificationForm';
import ActionButton from '@components/ActionButton';

const { Title } = Typography;

export default function IdentityVerification() {
  const [loading, setLoading] = useState<boolean>(false);
  const [verificationRequests, setVerificationRequests] = useState<UserVerificationRequest[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [showDocumentPreviewModal, setShowDocumentPreviewModal] = useState(false);
  const [documentPreviewUrl, setDocumentPreviewUrl] = useState('');
  // const [mockUserId, setMockUserId] = useState('user@example.com'); 
  const allVerificationColumns = [
    { title: 'Request ID', dataIndex: 'id', key: 'id' },
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    { title: 'Document Type', dataIndex: 'documentType', key: 'documentType' },
    {
      title: 'Submitted',
      dataIndex: 'submissionDate',
      key: 'submissionDate',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'pending' | 'approved' | 'rejected') => (
        <Tag color={status === 'pending' ? 'orange' : (status === 'approved' ? 'green' : 'red')}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Document Link',
      dataIndex: 'documentFrontImageUrl',
      key: 'documentFrontImageUrl',
      render: (text: string) => (
        <Button type="link" onClick={() => {
          setDocumentPreviewUrl(text);
          setShowDocumentPreviewModal(true);
        }}>View Document</Button>
      ),
    },
    {
      title: 'Reviewed',
      dataIndex: 'reviewDate',
      key: 'reviewDate',
      render: (text?: string) => (text ? new Date(text).toLocaleString() : 'N/A'),
    },
    {
      title: 'Rejection Reason',
      dataIndex: 'rejectionReason',
      key: 'rejectionReason',
      render: (text?: string) => text || 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: UserVerificationRequest) => (
        <Space>
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handleApproveReject(record.id, 'approved')}
                loading={loading}
                size="small"
              />
              <Button
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => handleApproveReject(record.id, 'rejected', 'Document unclear')}
                loading={loading}
                size="small"
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchRequests();
  }, []);
  
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const requests = await fetchUserVerificationRequests();
      setVerificationRequests(requests);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch verification requests.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleApproveReject = async (requestId: string, status: 'approved' | 'rejected', rejectionReason?: string) => {
    setLoading(true);
    try {
      const updatedRequest = await updateUserVerificationStatus(requestId, status, 'adminUser456', rejectionReason);
      setVerificationRequests((prev) =>
        prev.map((req) => (req.id === updatedRequest.id ? updatedRequest : req))
      );
      notification.success({
        message: `Request ${status === 'approved' ? 'Approved' : 'Rejected'}`,
        description: `Verification request ${requestId} has been ${status}.`,
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update verification request status.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Title level={2}>Identity Verification</Title>
    <ActionButton className='mb-2' onAdd={()=>{setShowModal(true)}} addTitle='Add Request'/>
        <Table
          columns={allVerificationColumns}
          dataSource={verificationRequests}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />

        <Modal  title="Verification Request"
        destroyOnClose
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          form.resetFields();
        }}
        onOk={() => {
          form.submit();
        }}
        okText="Submit Request"
      >
        <VerificationForm
          form={form}
          onSubmissionSuccess={() => {
            setShowModal(false);
            fetchRequests();
            form.resetFields();
          }}
          userId={'praveen@zoho.com'}
        />
      </Modal>

      <Modal
        open={showDocumentPreviewModal}
        title="Document Preview"
        footer={null}
        onCancel={() => setShowDocumentPreviewModal(false)}
      >
        <img alt="Document Preview" style={{ width: '100%' }} src={documentPreviewUrl} />
      </Modal>
    </>
  );
}

