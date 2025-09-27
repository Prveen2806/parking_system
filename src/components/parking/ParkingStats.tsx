import { Card, Row, Col, Statistic, Progress } from 'antd';
import { 
  CarOutlined, 
  SafetyOutlined, 
  DollarOutlined,
  TeamOutlined,
  TruckOutlined,
  DotChartOutlined,
} from '@ant-design/icons';

interface ParkingStatsProps {
  totalSlots: number;
  occupiedSlots: number;
  revenue: number;
  securityIncidents: number;
  availableValets: number;
  vehicleType: 'cycle' | 'car' | 'bike' | 'minibus' | 'cargo' | 'mixed';
}

export const ParkingStats = ({ 
  totalSlots, 
  occupiedSlots, 
  revenue, 
  securityIncidents,
  availableValets,
  vehicleType
}: ParkingStatsProps) => {
  const occupancyRate = (occupiedSlots / totalSlots) * 100;
  
  const getCapacityIcon = (type: 'cycle' | 'car' | 'bike' | 'minibus' | 'cargo' | 'mixed') => {
    switch (type) {
      case 'car':
        return <CarOutlined />;
      case 'cycle':
        return <CarOutlined />;
      case 'bike':
        return <CarOutlined />;
      case 'minibus':
        return <CarOutlined />;
      case 'cargo':
        return <TruckOutlined />;
      default:
        return <DotChartOutlined />;
    }
  };

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Total Capacity"
            value={totalSlots}
            prefix={getCapacityIcon(vehicleType)}
          />
        </Card>
      </Col>
      
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Occupancy Rate"
            value={occupancyRate}
            precision={1}
            suffix="%"
            valueStyle={{ color: occupancyRate > 80 ? '#cf1322' : occupancyRate > 60 ? '#fa8c16' : '#3f8600' }}
          />
          <Progress 
            percent={occupancyRate} 
            showInfo={false} 
            strokeColor={occupancyRate > 80 ? '#cf1322' : occupancyRate > 60 ? '#fa8c16' : '#3f8600'}
          />
        </Card>
      </Col>
      
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Daily Revenue"
            value={revenue}
            precision={2}
            prefix={<DollarOutlined style={{ color: '#52c41a' }} />}
            suffix="USD"
          />
        </Card>
      </Col>
      
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Available Valets"
            value={availableValets}
            prefix={<TeamOutlined style={{ color: '#1890ff' }} />}
          />
          {securityIncidents > 0 && (
            <div style={{ marginTop: '8px' }}>
              <Statistic
                title="Security Alerts"
                value={securityIncidents}
                prefix={<SafetyOutlined style={{ color: '#faad14' }} />}
                valueStyle={{ color: '#cf1322', fontSize: '14px' }}
              />
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};