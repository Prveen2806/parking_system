import { ConfigProvider, App as AntApp } from "antd";

export default function AntdProvider({ children }: { children: React.ReactNode }) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#1890ff',
                    colorText: '#333',
                    colorTextSecondary: '#666',
                    colorTextHeading: '#2c3e50',
                    fontFamily: 'Roboto, sans-serif',
                },
                components: {
                    Layout: {
                        bodyBg: '#e6f7ff',
                    }
                }
            }}
            form={{ scrollToFirstError: true }}
        >
            <AntApp >
                <>{children}</>
            </AntApp>
        </ConfigProvider>
    )
}