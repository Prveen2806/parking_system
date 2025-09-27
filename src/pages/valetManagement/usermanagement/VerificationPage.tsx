
import { Button, Result, Typography } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Paragraph, Text } = Typography;

export default function VerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; // Get email from state

  return (
    <Result
      status="info"
      title="Verification Request Submitted"
      subTitle={
        <Paragraph>
          Your account verification request has been submitted and is pending review by an administrator.
          You will be notified once your request has been processed.
          <br />
          <Text strong>Associated Email: {email || 'N/A'}</Text>
        </Paragraph>
      }
      extra={[
        <Button type="primary" key="home" onClick={() => navigate('/')}>
          Go to Home
        </Button>,
      ]}
    />
  );
}
