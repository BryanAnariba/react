import React, { useContext, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router";
import EnterPage from "../pages/EnterPage";
import QueuePage from "../pages/QueuePage";
import CreateTicketPage from "../pages/CreateTicketPage";
import DesktopPage from "../pages/DesktopPage";
import { MenuUIContext } from "../store/context/MenuUiContext";

const { Header, Sider, Content } = Layout;

export const TicketAppRouter: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Para esta pantalla se oculartaran los Sider y Header
  const { menu } = useContext(MenuUIContext);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout style={{ height: "100vh" }}>
        <Sider hidden={menu} collapsed={collapsed} collapsedWidth="0" breakpoint="md">
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: <Link to={"enter"}>Ingresar</Link>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: <Link to={"tickets-queue"}>Cola de Tickets</Link>,
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: <Link to={"create-ticket"}>Crear Ticket</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{ padding: 0, background: colorBgContainer }}
            hidden={menu}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/enter" element={<EnterPage />} />
              <Route path="/tickets-queue" element={<QueuePage />} />
              <Route path="/create-ticket" element={<CreateTicketPage />} />
              <Route path="/desktop" element={<DesktopPage />} />
              <Route path="*" element={<Navigate to="enter" />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};
