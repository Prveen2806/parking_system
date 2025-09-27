import  { useState } from 'react';
import { Table, Button, Modal, Form, Space, notification } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ValetStaff } from '@pages/cycleParking/types';
import ValetForm from '@components/valetManagement/ValetForm';

export default function ValetManagement() {

  const [valets, setValets] = useState<ValetStaff[]>([
    { id: '1', name: 'Praveen', email: 'praveen.n@gmail.com', contactNumber: '123-456-7890', status: 'available', skills: ['car', 'bike'], currentLocation: { floor: 1, section: 'A' } },
    { id: '2', name: 'Praveen NS', email: 'praveenNS@gmail.com', contactNumber: '098-765-4321', status: 'occupied', skills: ['minibus', 'cargo'], currentAssignment: 'CAR-101' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingValet, setEditingValet] = useState<ValetStaff | null>(null);
  const [form] = Form.useForm();
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Contact Number', dataIndex: 'contactNumber', key: 'contactNumber' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Skills', dataIndex: 'skills', key: 'skills', render: (skills: string[]) => skills.join(', ') },
    { title: 'Current Assignment', dataIndex: 'currentAssignment', key: 'currentAssignment' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: ValetStaff) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];
  
  const handleAdd = () => {
    setEditingValet(null);
    form.resetFields();
    setIsModalVisible(true);
  };
  
  const handleEdit = (valet: ValetStaff) => {
    setEditingValet(valet);
    form.setFieldsValue(valet);
    setIsModalVisible(true);
  };
  
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this valet?',
      onOk: () => {
        setValets(valets.filter((valet) => valet.id !== id));
        notification.success({ message: 'Success', description: 'Valet deleted successfully.' });
      },
    });
  };
  
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingValet) {
        setValets(valets.map((valet) => (valet.id === editingValet.id ? { ...valet, ...values } : valet)));
        notification.success({ message: 'Success', description: 'Valet updated successfully.' });
      } else {
        const newValet: ValetStaff = { ...values, id: Date.now().toString(), status: 'available' };
        setValets([...valets, newValet]);
        notification.success({ message: 'Success', description: 'Valet added successfully.' });
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  
  return (
    <>
      <h1>Valet Management</h1>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Valet
      </Button>
      <Table columns={columns} dataSource={valets} rowKey="id" />
      <Modal
        title={editingValet ? 'Edit Valet' : 'Add New Valet'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ValetForm form={form} initialValues={editingValet} />
      </Modal>
    </>
  );
}

