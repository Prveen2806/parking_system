import AntdProvider from "./antd";

export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <AntdProvider>
            {children}
        </AntdProvider>
    )
}