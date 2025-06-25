import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Typography } from "antd";
import { useMenu } from "../store/hooks/useMenu";
import { getUserStorage } from "../utils/getUserStorage";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { SocketContext } from "../store/context/SocketContext";
import type { Ticket } from "../../../tickets-web-app-backend/src/modules/tickets/entities/ticket.entity";

const { Title, Text } = Typography;

export default function DesktopPage() {
  const [user] = useState(getUserStorage());
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  // Para esta pantalla tiene que aparecer el menu
  useMenu(false);

  const onExit = () => {
    localStorage.removeItem("ticket-web-app-agent");
    localStorage.removeItem("ticket-web-app-desktop");
    navigate("/enter");
  };

  const onNextTicket = () => {
    console.log("Siguiente ticket!!!");
    socket.emit(
      "siguiente-ticket-a-trabajar",
      user,
      (serverResponse: Ticket) => {
        console.log({ ticketAignadoA: serverResponse });
        setTicket(serverResponse);
      }
    );
  };

  if (!user.agent && !user.desktop) return <Navigate to={"/enter"} />;
  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{user.agent}</Title>
          <Text>Usted esta trabajando en el escritorio: </Text>
          <Text type="success">{user.desktop}</Text>
        </Col>
        <Col span={4} style={{ alignItems: "flex-end" }}>
          <Button shape="round" type="primary" color="danger" onClick={onExit}>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />
      {ticket && (
        <Row>
          <Col>
            <Text>Esta atendiento el ticket numero: </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {ticket.ticketNo}
            </Text>
          </Col>
        </Row>
      )}
      <Row>
        <Col offset={18} span={6} style={{ alignItems: "flex-end" }}>
          <Button
            onClick={onNextTicket}
            shape="round"
            type="primary"
            color="danger"
          >
            <RightOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  );
}
