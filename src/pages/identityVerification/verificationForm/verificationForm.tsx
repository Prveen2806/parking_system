import { Form, Select, notification } from "antd";
import { submitVerificationRequest } from '../utils';
import type { FormInstance } from 'antd';
import UploadInput from "@components/UploadInput";

interface VerificationFormProps {
  onSubmissionSuccess: () => void;
  form?: FormInstance;
  userId: string;
}

export default function VerificationForm({ onSubmissionSuccess, form: antdForm, userId }: VerificationFormProps){
  const [form] = antdForm ? [antdForm] : Form.useForm();

  const handleSubmit = async (values: any) => {
    if (!values.documentFrontImage || values.documentFrontImage.length === 0) {
      notification.error({ message: 'Error', description: 'Please upload the front of your document.' });
      return;
    }
    // setLoading(true);
    try {
      await submitVerificationRequest({
        userId: userId, // Use the passed userId
        documentType: values.documentType,
        documentFrontImageUrl: values.documentFrontImage[0].content || '',
        documentBackImageUrl: values.documentBackImage ? values.documentBackImage[0].content : undefined,
        selfieImageUrl: values.selfieImage ? values.selfieImage[0].content : undefined,
      });
      notification.success({
        message: 'Verification Request Submitted',
        description: 'Your identity verification request has been submitted successfully.',
      });
      form.resetFields();
      onSubmissionSuccess(); // Call the callback to refresh the table
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to submit verification request.',
      });
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="documentType"
          label="Document Type"
          rules={[{ required: true, message: 'Please select a document type!' }]}
        >
          <Select placeholder="Select a document type">
            <Select.Option value="drivers_license">Driver's License</Select.Option>
            <Select.Option value="passport">Passport</Select.Option>
            <Select.Option value="national_id">National ID</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="documentFrontImage" label="Document Front Image" rules={[{ required: true, message: 'Please upload the front of your document!' }]}>
          <UploadInput accept="image/*" maxCount={1} raw={true} />
        </Form.Item>

        <Form.Item name="documentBackImage" label="Document Back Image (Optional)">
          <UploadInput accept="image/*" maxCount={1} raw={true} />
        </Form.Item>

        <Form.Item name="selfieImage" label="Selfie Image (Optional)">
          <UploadInput accept="image/*" maxCount={1} raw={true} />
        </Form.Item>
      </Form>
    </>
  );
}