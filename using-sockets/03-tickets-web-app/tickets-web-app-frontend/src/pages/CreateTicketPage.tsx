import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import { useMenu } from "../store/hooks/useMenu";
import { useContext, useState } from "react";
import { SocketContext } from "../store/context/SocketContext";
import { Ticket } from "../../../tickets-web-app-backend/src/modules/tickets/entities/ticket.entity";

const { Text, Title } = Typography;

export default function CreateTicketPage() {
  const [ticket, setTicket] = useState<Ticket | null>(null);

  // Para esta pantalla tiene que desaparecer el menu
  useMenu(true);

  const { socket } = useContext(SocketContext);

  const onNewTicket = () => {
    socket.emit("solicitar-ticket", null, (serverResponse: Ticket) => {
      console.log({ ticket: serverResponse });
      setTicket(serverResponse);
    });
  };

  return (
    <>
      <Row>
        <Col
          span={14}
          offset={6}
          style={{ alignItems: "center", textAlign: "center" }}
        >
          <Title level={3}>
            Presione el boton para generar un nuevo ticket:{" "}
          </Title>
          <Button
            type="primary"
            color="primary"
            shape="round"
            size="large"
            onClick={onNewTicket}
          >
            <DownloadOutlined />
          </Button>
        </Col>
      </Row>
      {ticket && (
        <Row style={{ marginTop: "100px" }}>
          <Col
            span={14}
            offset={6}
            style={{ alignItems: "center", textAlign: "center" }}
          >
            <Title level={3}>Su Numero</Title>
            <Text type="success" style={{ fontSize: 55 }}>
              {ticket.ticketNo}
            </Text>
            <br />
          </Col>
        </Row>
      )}
    </>
  );
}
