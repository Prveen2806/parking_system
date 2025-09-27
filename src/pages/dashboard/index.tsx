import React from 'react';
import { Layout, Card, Col, Row, Statistic, Progress, Space, Tag, Table } from 'antd';
import { 
    CarOutlined, 
    UserOutlined, 
    DollarOutlined
} from '@ant-design/icons';

const { Content, } = Layout;

interface Activity {
    key: string;
    time: string;
    action: string;
    slot: string;
    user: string;
    status: string;
}

const columns = [
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
    },
    {
        title: 'Slot',
        dataIndex: 'slot',
        key: 'slot',
        render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => {
            let color = status === 'COMPLETED' ? 'green' : status === 'IN-PROGRESS' ? 'orange' : 'default';
            return <Tag color={color}>{status}</Tag>;
        },
    },
];

const data: Activity[] = [
    { key: '1', time: '09:15 AM', action: 'Vehicle Parked', slot: 'C01-15', user: 'John Doe', status: 'COMPLETED' },
    { key: '2', time: '09:12 AM', action: 'Vehicle Departed', slot: 'C02-08', user: 'Sarah Wilson', status: 'COMPLETED' },
    { key: '3', time: '09:08 AM', action: 'Valet Assigned', slot: 'C01-22', user: 'Mike Johnson', status: 'IN-PROGRESS' },
];

const Dashboard: React.FC = () => {
    return (
        // <Layout style={{ minHeight: '100vh' }}>
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    <div style={{ padding: '24px', minHeight: '360px' }}>
                        <h1>Dashboard Overview</h1>
                        <p>Real-time monitoring of parking facilities and operations</p>

                        <Row gutter={16} style={{ marginBottom: '24px' }}>
                            <Col span={6}>
                                <Card>
                                    <Statistic title="Total Capacity" value={480} prefix={<CarOutlined />} />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic title="Occupancy Rate" value={30} formatter={(value) => `${value}%`} />
                                    <Progress percent={30} showInfo={false} />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic title="Daily Revenue" value={2450.75} precision={2} prefix={<DollarOutlined />} suffix="USD" />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic title="Available Valets" value={12} prefix={<UserOutlined />} />
                                </Card>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={16}>
                                <Card title="Recent Activity">
                                    <Table dataSource={data} columns={columns} pagination={false} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="Floor Status">
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Card size="small">
                                            <Row justify="space-between" align="middle">
                                                <Col>
                                                    <Statistic title="Floor 1" value={166} suffix="/480 occupied" />
                                                </Col>
                                                <Col>
                                                    <Progress type="circle" percent={35} width={60} format={(percent) => `${percent}%`} />
                                                </Col>
                                            </Row>
                                        </Card>
                                        <Card size="small">
                                            <Row justify="space-between" align="middle">
                                                <Col>
                                                    <Statistic title="Floor 2" value={151} suffix="/480 occupied" />
                                                </Col>
                                                <Col>
                                                    <Progress type="circle" percent={31} width={60} format={(percent) => `${percent}%`} />
                                                </Col>
                                            </Row>
                                        </Card>
                                        <Card size="small">
                                            <Row justify="space-between" align="middle">
                                                <Col>
                                                    <Statistic title="Floor 3" value={91} suffix="/480 occupied" />
                                                </Col>
                                                <Col>
                                                    <Progress type="circle" percent={19} width={60} format={(percent) => `${percent}%`} />
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Space>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Content>
            {/* </Layout> */}
        </Layout>
    );
};

export default Dashboard;