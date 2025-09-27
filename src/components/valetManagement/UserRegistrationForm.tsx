import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import type { User } from '@pages/cycleParking/types';


interface UserRegistrationFormProps {
  form: any; // Ant Design Form instance
  initialValues?: User | null;
}

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({ form, initialValues }) => {
  useEffect(() => {
    form.resetFields();
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form form={form} layout="vertical">
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
        name="contactNumber"
        label="Contact Number"
        rules={[{ required: true, message: 'Please enter contact number' }]}
      >
        <Input placeholder="Enter contact number" />
      </Form.Item>
      
      <Form.Item
        name="vehicleRegistration"
        label="Vehicle Registration"
        rules={[{ required: true, message: 'Please enter vehicle registration' }]}
      >
        <Input placeholder="Enter vehicle registration number" />
      </Form.Item>
    </Form>
  );
};

export default UserRegistrationForm;
