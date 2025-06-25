import { Card, Col, Divider, List, Row, Tag, Typography } from "antd";
import { useMenu } from "../store/hooks/useMenu";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../store/context/SocketContext";
import type { Ticket } from "../types/ticket.types";

const { Title, Text } = Typography;

export default function QueuePage() {
  // Para esta pantalla tiene que desaparecer el menu
  useMenu(true);

  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    socket.on('tickets-asignados', (asignedTickets: Ticket[]) => {
      // console.log({asignedTickets})
      setTickets(asignedTickets);
    });

    return () => {
      socket.off('tickets-asignados')
    }
  }, [socket]);

  useEffect(() => {
    // fetch("http://localhost:3500/tickets")
    fetch("https://reqres.in/api/users?page=2")
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }, []);

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
                    <Tag color="magenta">Escritorio {item.desktop}</Tag>,
                  ]}
                >
                  <Title>No. {item.ticketNo}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider style={{ borderColor: "#7cb305" }}>Historial</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(ticket) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${ticket.ticketNo}`}
                  description={
                    <>
                      <Text type="secondary">En el escritorio</Text>
                      <Tag color="magenta">{ticket.ticketNo}</Tag>
                      <Text type="secondary">Agente: </Text>
                      <Tag color="volcano">{ticket.agent}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
}
