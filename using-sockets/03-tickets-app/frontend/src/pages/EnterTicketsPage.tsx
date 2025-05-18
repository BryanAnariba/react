import { Navigate, useNavigate } from "react-router";
import { SaveOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import { Button, Divider, Form, Input, InputNumber } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import useMenu from "../hooks/useMenu";
import { useState } from "react";
import { getUserStorage } from "../utils/local-storage.utils";

type FieldType = {
  agent?: string;
  desktop?: string;
};

export default function EnterTicketsPage() {
  // ESTO ESCONDE EL MENU ACORDE A LA PANTALLA Y ES IMPORTANTE PARA LO QUE NECESITO HACER PARA EL PROYETO DE CREFISA
  useMenu(false);
  const navigate = useNavigate();
  const [user] = useState(getUserStorage());

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    localStorage.setItem("agent", `${values.agent}`);
    localStorage.setItem("desktop", `${values.desktop}`);
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
      <Text>Ingrese su nombre y numero de escritorio!</Text>
      <Divider></Divider>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Nombre del agente: "
          name="agent"
          rules={[
            { required: true, message: "Nombre del agente es requerido" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="No Escritorio: "
          name="desktop"
          rules={[{ required: true, message: "Escritorio es requerido" }]}
        >
          <InputNumber min={1} max={9999} />
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
