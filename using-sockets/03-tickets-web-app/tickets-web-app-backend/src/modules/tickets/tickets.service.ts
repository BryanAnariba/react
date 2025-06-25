import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { setUUID } from 'src/utils/uuid.utils';

@Injectable()
export class TicketsService {
  public lastTicketNo: number = 0;
  public pendingTickets: Ticket[] = [];
  public asignedTickets: Ticket[] = [];

  // Incrementamos el numero de ticket
  public get lastTicketNumber(): number {
    this.lastTicketNo = this.lastTicketNo + 1;
    return this.lastTicketNo;
  }

  // Mostramos los 3 tickets que se veran en las tarjetas y 10 en el historial
  public get last13Tickets(): Ticket[] {
    return this.asignedTickets.length === 0 ? [] : this.asignedTickets.slice(0, 13);
  }

  public findAll (): Ticket[] {
    return this.last13Tickets;
  }

  public create(): Ticket {
    const newTicket: Ticket = {
      ticketNo: this.lastTicketNumber,
      id: setUUID(),
    };
    this.pendingTickets.push(newTicket);
    return newTicket;
  }

  public asignTicket(createTicketDto: CreateTicketDto): Ticket {
    if (this.pendingTickets.length === 0) throw new BadRequestException('No hay tickets pendientes!');
    let nextTicket: Ticket = this.pendingTickets.shift()!;
    nextTicket = {
      ...nextTicket,
      ...createTicketDto,
    };
    this.asignedTickets.unshift(nextTicket);
    return nextTicket;
  }
}
