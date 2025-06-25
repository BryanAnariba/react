import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TicketsService } from '../tickets/tickets.service';
import { Ticket } from '../tickets/entities/ticket.entity';
import { CreateTicketDto } from '../tickets/dto/create-ticket.dto';

@WebSocketGateway({ cors: true, namespace: 'tickets-connection' })
export class TicketsWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly ticketsService: TicketsService,
  ) {}

  public handleConnection(client: Socket) {
    console.log(`Client ${client.id} connected!`);
  }

  public handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected!`);
  }

  @SubscribeMessage('solicitar-ticket')
  public onCreateNewTicket(client: Socket) {
    const ticket: Ticket = this.ticketsService.create();
    console.log(`New ticket created from ${client.id}!`, ticket);
    return ticket;
  }

  @SubscribeMessage('siguiente-ticket-a-trabajar')
  onAsignTicketToAgent(client: Socket, createTicketDto: CreateTicketDto) {
    console.log(`Client ${client.id} asigned ticket!`, createTicketDto);
    const asignedTicket = this.ticketsService.asignTicket(createTicketDto);
    this.wss.emit('tickets-asignados', this.ticketsService.findAll());
    return asignedTicket;
  }
}
