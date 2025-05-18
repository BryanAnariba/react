import { Card, Col, Divider, List, Row, Tag, Typography } from "antd";
import useMenu from "../hooks/useMenu";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../store/context/SocketContext";
import type { Ticket } from "../types/ticket.types";
import { getTickets } from "../services/tickets.service";

const { Text, Title } = Typography;
export default function TicketsQueuePage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    getTickets()
      .then((tickets) => {
        console.log(tickets);
        setTickets(tickets);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    socket.on("asigned-tickets", (ticketsData) => {
      console.log(ticketsData);
      setTickets(ticketsData);
    });

    return () => {
      socket.off("asigned-tickets");
    };
  }, [socket]);

  // ESTO ESCONDE EL MENU ACORDE A LA PANTALLA Y ES IMPORTANTE PARA LO QUE NECESITO HACER PARA EL PROYETO DE CREFISA
  useMenu(true);
  return (
    <>
      <Title level={1}>Atendiendo al cliente</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color="volcano">{item.agent}</Tag>,
                    <Tag color="magenta">{item.desktop}</Tag>,
                  ]}
                >
                  <Title>
                    No.{""} {item.no}
                  </Title>
                </Card>
              </List.Item>
            )}
          ></List>
        </Col>
        <Col span={12}>
          <Divider>Historial</Divider>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${item.no}`}
                  description={
                    <>
                      <Text type="secondary">En el escritorio </Text>
                      <Tag color="magenta">{item.no}</Tag>
                      <Text type="secondary">Agente: </Text>
                      <Tag color="volcano">{item.agent}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          ></List>
        </Col>
      </Row>
    </>
  );
}
