import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Typography } from "antd";
import useMenu from "../hooks/useMenu";
import { useContext, useState } from "react";
import {
  deleteDataFromLocalStorage,
  getUserStorage,
} from "../utils/local-storage.utils";
import { Navigate, useNavigate } from "react-router";
import { SocketContext } from "../store/context/SocketContext";
import type { Ticket } from "../types/ticket.types";

const { Title, Text } = Typography;

export default function TicketDesktopPage() {
  // ESTO ESCONDE EL MENU ACORDE A LA PANTALLA Y ES IMPORTANTE PARA LO QUE NECESITO HACER PARA EL PROYETO DE CREFISA
  useMenu(false);
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const [user] = useState(getUserStorage());
  const [ticket, setTicket] = useState<Ticket>({} as Ticket);

  const onClose = (): void => {
    deleteDataFromLocalStorage();
    navigate("/enter-tickets-app");
  };

  const onNextTicket = (): void => {
    socket.emit(
      "on-asign-ticket-to-agent-from-client",
      user,
      (ticket: Ticket) => {
        console.log({ticket});
        setTicket(ticket);
      }
    );
  };

  if (!user.agent || !user.desktop)
    return <Navigate to={"/enter-tickets-app"} />;

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{user.agent}</Title>
          <Text>Usted esta trabajando en el escritorio</Text>
          <Text type="success">
            {""} {user.desktop}
          </Text>
        </Col>

        <Col span={4} style={{ alignSelf: "flex-end" }}>
          <Button shape="round" type="primary" onClick={onClose}>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />
      {ticket.no ? (
        <Row>
          <Col>
            <Text>Esta atentiendo el ticket No: </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {""} {ticket.no}
            </Text>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Text>No hay tickets aun presione siguiente!</Text>
          </Col>
        </Row>
      )}
      <Row>
        <Col span={4} style={{ alignSelf: "flex-end" }} offset={18}>
          <Button onClick={onNextTicket} shape="round" type="primary">
            <RightOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  );
}
