import { CarOutlined, DashboardOutlined, SafetyOutlined, SettingOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import { ROUTES } from "@routes/const";

export type navLinkType = {
    id?: number;
    key: string;
    label: string;
    title?: string;
    icon?: React.ReactNode;
    children?: navLinkType[];
    roleId?: number; // only for this role id will see this menu
};

const navLinks: navLinkType[] = [
    {
        id: 0,
        label: "Dashboard",
        icon: <DashboardOutlined />,
        key: ROUTES.DASHBOARD
    },
    {
        id: 1,
        key: ROUTES.CYCLEPARK,
        icon: <CarOutlined />,
        label: 'Cycle Parking',
    },
    {
        id: 2,
        key: ROUTES.CARPARK,
        icon: <CarOutlined />,
        label: 'Car Parking',
    },
    {
        id: 3,
        key: ROUTES.BIKEPARK,
        icon: <CarOutlined />,
        label: 'Bike Parking',
    },
    {
        id: 4,
        key: ROUTES.MINIBUSPARK,
        icon: <CarOutlined />,
        label: 'Minibus Parking',
    },
    {
        id: 5,
        key: ROUTES.CARGOPARK,
        icon: <CarOutlined />,
        label: 'Cargo Parking',
    },
    {
        id: 6,
        key: ROUTES.SECURITY,
        icon: <SafetyOutlined />,
        label: 'Security & Tracking',
        children: [
            {
                key: ROUTES.THEFT_TRACKING,
                label: 'Theft Tracking',
            },
            {
                key: ROUTES.IDENTITY_VERIFICATION,
                label: 'Identity Verification',
            },
        ],
    },
    {
        id: 7,
        key: ROUTES.VALETMANAGEMENT,
        icon: <TeamOutlined />,
        label: 'Valet Management',
    },
    {
        id: 8,
        key: ROUTES.REGISTER_USER,
        icon: <UserAddOutlined />,
        label: 'User Register',
    },
    {
        id: 9,
        key: '/settings',
        icon: <SettingOutlined />,
        label: 'Settings',
    },
]

export default navLinks
