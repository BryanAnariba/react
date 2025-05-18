import { useContext, useState } from "react";
import { Layout, Menu, type MenuProps } from "antd";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import CreateTicketPage from "../pages/CreateTicketPage";
import TicketsQueuePage from "../pages/TicketsQueuePage";
import TicketDesktopPage from "../pages/TicketDesktopPage";
import EnterTicketsPage from "../pages/EnterTicketsPage";
import { UiContext } from "../store/context/UiContext";

const { Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
  {
    label: <Link to={"enter-tickets-app"}>Ingresar</Link>,
    icon: <UserOutlined />,
    key: '1'
  },
  {
    label: <Link to={"tickets-queue"}>Cola de tickets</Link>,
    icon: <VideoCameraOutlined />,
    key: '2'
  },
  {
    label: <Link to={"create-ticket"}>Crear ticket</Link>,
    icon: <UploadOutlined />,
    key: '3'
  },
]

export default function TicketsAppRouter() {
  const {menu} = useContext(UiContext);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          collapsedWidth={'0'}
          breakpoint="md"
          hidden={menu}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Content style={{ padding: "20px 20px", backgroundColor: 'white' }}>
            <Routes>
              <Route path="/enter-tickets-app" element={<EnterTicketsPage />} />
              <Route path="/tickets-queue" element={<TicketsQueuePage />} />
              <Route path="/create-ticket" element={<CreateTicketPage />} />
              <Route path="/desktop" element={<TicketDesktopPage />} />
              <Route
                path="*"
                element={<Navigate to="/enter-tickets-app" replace />}
              />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center", backgroundColor: 'white' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}
