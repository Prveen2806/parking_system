import React, { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import type { ValetStaff } from '@pages/cycleParking/types';


interface ValetFormProps {
  form: any; // Ant Design Form instance
  initialValues?: ValetStaff | null;
}

const ValetForm: React.FC<ValetFormProps> = ({ form, initialValues }) => {
  useEffect(() => {
    form.resetFields();
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form form={form} layout="vertical">
      <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter valet name' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter email', type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="contactNumber" label="Contact Number" rules={[{ required: true, message: 'Please enter contact number' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="skills" label="Skills" rules={[{ required: true, message: 'Please select skills' }]}>
        <Select mode="multiple" placeholder="Select skills">
          <Select.Option value="car">Car</Select.Option>
          <Select.Option value="bike">Bike</Select.Option>
          <Select.Option value="minibus">Minibus</Select.Option>
          <Select.Option value="cargo">Cargo</Select.Option>
          <Select.Option value="cycle">Cycle</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default ValetForm;
