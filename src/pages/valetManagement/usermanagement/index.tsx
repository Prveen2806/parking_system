import { PlusOutlined } from "@ant-design/icons";
import type { User } from "@pages/cycleParking/types";
import { Button, Modal, Table, Form } from "antd";
import { useEffect, useState } from "react";
import { fetchRegisteredUsers } from "../utils";
import RegisterUserForm from "./RegisterUserPage";
import Title from "antd/es/typography/Title";


export default function RegisteredUsers() {
    const [showModal, setShowModal] = useState(false);
    const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const loadUsers = async () => {
            const users = await fetchRegisteredUsers();
            setRegisteredUsers(users);
        };
        loadUsers();
    }, [showModal]); // Rerun effect when modal closes after registration

    const handleOk = async () => {
        form.submit(); // Trigger form submission in RegisterUserForm
    };
    return (
        <>
            <Title style={{ marginTop: 24 }}>Registered Users</Title>
            <Button type="default" className='ms-1 mb-2' icon={<PlusOutlined />} onClick={() => setShowModal(true)}>
                Register New User for Parking
            </Button>
            <Table
                columns={[
                    { title: 'ID', dataIndex: 'id', key: 'id' },
                    { title: 'Name', dataIndex: 'name', key: 'name' },
                    { title: 'Email', dataIndex: 'email', key: 'email' },
                    { title: 'Contact Number', dataIndex: 'contactNumber', key: 'contactNumber' },
                    { title: 'Vehicle Registration', dataIndex: 'vehicleRegistration', key: 'vehicleRegistration' },
                    { title: 'Verified', dataIndex: 'verified', key: 'verified', render: (text: boolean) => (text ? 'Yes' : 'No') },
                    { title: 'Parking Location', dataIndex: 'parkingLocation', key: 'parkingLocation', render: (text?: string) => text || 'N/A' },
                ]}
                dataSource={registeredUsers}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
            <Modal
                title={'User Register'}
                open={showModal}
                onOk={handleOk}
                onCancel={() => {
                    setShowModal(false);
                    form.resetFields();
                }}
            >
                <RegisterUserForm form={form} onSuccess={() => setShowModal(false)} />
            </Modal>
        </>
    )
}