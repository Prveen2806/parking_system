import { Layout, Menu, type MenuProps } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import navLinks from "./navLink";
import { ROUTES } from "@routes/const";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

export default function MainLayout() {
    const menuList = navLinks;
    // const [showDraw, setShowDraw] = useState(false);
    const navigate = useNavigate();
    const menuProps: MenuProps = {
        defaultSelectedKeys: [window.location.pathname],
        defaultOpenKeys: window.location.pathname.replace(/\//g, "~/").split("~"),
        items: menuList,
        onClick: ({ key }) => {
            // setShowDraw(false);
            navigate(key);
        },
        mode: "inline",
    };
    return (
        <Layout>
            <Layout className="gap-1 bg-transparent" hasSider style={{ margin: 0, }}>
                <Layout.Sider
                    width={240}
                    breakpoint="lg"
                    theme="light"
                    className="rounded-3 shadow bg-primary overflow-auto hide-scrollbar side-bar d-none d-md-block"
                    collapsible
                >
                    <div className="px-3 pt-1 position-sticky top-0 bg-primary"
                        style={{ zIndex: 1 }}>
                        <Link to={ROUTES.DASHBOARD} style={{color:'#FFFF',textDecoration:'none'}} replace className="logo-link">
                            Parking System
                        </Link>
                    </div>
                    <Menu
                        className="border-0 bg-transparent user-select-none sp-menu pb-5"
                        {...menuProps}
                    />
                </Layout.Sider>
                <Layout style={{ margin: 0, }}>
                    <Layout.Header className="bg-white shadow-sm d-flex justify-content-end align-items-center gap-3">
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: "logout",
                                        label: (
                                            <a onClick={() => console.log("Logout clicked")}>
                                                <LogoutOutlined /> Logout
                                            </a>
                                        ),
                                    },
                                ],
                            }}
                            placement="bottomRight"
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <UserOutlined style={{ fontSize: '20px' }} />
                                </Space>
                            </a>
                        </Dropdown>
                    </Layout.Header>
                    <Layout.Content>
                        <Outlet />
                    </Layout.Content>
                </Layout>
            </Layout>
        </Layout>
    )
}