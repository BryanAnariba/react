import { SaveOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import { Button, Divider, Form, Input, InputNumber, Typography } from "antd";
import { useNavigate } from "react-router";
import { useMenu } from "../store/hooks/useMenu";
import { useState } from "react";
import { getUserStorage } from "../utils/getUserStorage";
import { Navigate } from "react-router";

const { Text, Title } = Typography;

type FieldType = {
  agent?: string;
  desktop?: string;
};

export default function EnterPage() {
  const [user] = useState(getUserStorage());

  // Para esta pantalla tiene que aparecer el menu
  useMenu(false);
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    localStorage.setItem("ticket-web-app-agent", `${values.agent}`);
    localStorage.setItem("ticket-web-app-desktop", `${values.desktop}`);
    navigate("/desktop");
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  if (user.agent && user.desktop) return <Navigate to={"/desktop"} />;
  return (
    <>
      <Title level={2}>Ingresar</Title>
      <Text>Ingrese su usuario y numero de escritorio.</Text>
      <Divider />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Nombre del agente"
          name="agent"
          rules={[{ required: true, message: "Por favor ingrese su nombre!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Desktop"
          name="desktop"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su numero de escritorio!",
            },
          ]}
        >
          <InputNumber min={1} max={999} />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" shape="round">
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
