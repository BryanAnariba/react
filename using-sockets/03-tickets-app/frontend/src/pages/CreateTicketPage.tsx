import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import useMenu from "../hooks/useMenu";
import { useContext, useState } from "react";
import { SocketContext } from "../store/context/SocketContext";
import type { Ticket } from "../types/ticket.types";

const { Title, Text } = Typography;

export default function CreateTicketPage() {
  const {socket} = useContext(SocketContext);
  const [ticket, setTicket] = useState<Ticket>({} as Ticket);
  // ESTO ESCONDE EL MENU ACORDE A LA PANTALLA Y ES IMPORTANTE PARA LO QUE NECESITO HACER PARA EL PROYETO DE CREFISA
  useMenu(true);

  const onCreateNewTicket = () => {
    socket.emit("on-create-new-ticket-from-client", null, (data: Ticket) => {
      setTicket(data);
    });
  };

  return (
    <>
      <Row>
        <Col span={14} offset={6} style={{ textAlign: "center" }}>
          <Title level={3}>
            Presione el boton para generar un nuevo ticket.
          </Title>
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={onCreateNewTicket}
          >
            <DownloadOutlined />
            Nuevo ticket
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: 100 }}>
        <Col span={14} offset={6} style={{ textAlign: "center" }}>
          <Title level={2}>Su numero</Title>
          <br />
          <Text type="success" style={{ fontSize: 55 }}>
            {ticket.no}
          </Text>
        </Col>
      </Row>
    </>
  );
}
