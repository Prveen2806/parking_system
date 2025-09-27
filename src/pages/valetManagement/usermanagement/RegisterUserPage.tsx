
import { Form, Input, notification } from 'antd';
import { addRegisteredUser } from '../utils';
import type { FormInstance } from 'antd';
import { useNavigate } from 'react-router-dom';

interface RegisterUserFormProps {
  form: FormInstance;
  onSuccess?: () => void; // Add onSuccess prop
}

export default function RegisterUserForm({ form, onSuccess }: RegisterUserFormProps){
  const navigate = useNavigate();
  
  const handleUserRegistration = async (values: any) => {
    try {
      const newUser = await addRegisteredUser(values); 
      notification.success({
        message: 'User Registered',
        description: `User ${newUser.name} registered successfully.`,
      });
      form.resetFields();
      onSuccess?.(); // Call onSuccess to close modal
      navigate('/user-management/verify', { state: { email: newUser.email } });
    } catch (error) {
      notification.error({
        message: 'Registration Failed',
        description: 'Failed to register user.',
      });
    }
  };
  
  return (
      <Form form={form} layout="vertical" onFinish={handleUserRegistration}>
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
}
