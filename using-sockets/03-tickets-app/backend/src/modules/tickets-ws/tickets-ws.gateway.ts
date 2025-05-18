import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TicketsService } from '../tickets/tickets.service';
import { Ticket } from '../tickets/entities/ticket.entity';
import { AsignTicketDto } from './dtos/asign-ticket.dto';

@WebSocketGateway({ cors: true, namespace: 'tickets'})
export class TicketsWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  constructor(private readonly ticketsService: TicketsService) {}

  public handleConnection(client: Socket) {
    console.log(`Client ${client.id} connected!`);
  }

  public handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected!`);
  }

  @SubscribeMessage('on-create-new-ticket-from-client')
  onCreateNewTicketFromClient (client: Socket) {
    const ticket: Ticket = this.ticketsService.create();
    console.log(`New Ticket Created from ${client.id}! `, ticket);
    return ticket;
  }

  @SubscribeMessage("on-asign-ticket-to-agent-from-client")
  onAsignTicketToAgenFromClient(client: Socket, asignTicketDto: AsignTicketDto): Ticket | undefined {
    console.log(`Client ${client.id} asigning ticket: `, asignTicketDto);
    const asignedTicket = this.ticketsService.asignTicket(asignTicketDto.agent, asignTicketDto.no)!;
    this.wss.emit('asigned-tickets', this.ticketsService.findAll());
    return asignedTicket;
  }

}
