import { Injectable } from '@nestjs/common';
import { Ticket } from './entities/ticket.entity';
import { setUUID } from 'src/utils/uuid.utils';

@Injectable()
export class TicketsService {
  public lastTicketNumber: number = 0;
  public pendingTickets: Ticket[] = [];
  public asignedTickets: Ticket[] = [];

  public get nextTicketNumer(): number {
    this.lastTicketNumber += 1;
    return this.lastTicketNumber;
  }

  // Retornar 3 ticket grandesitos y 10 serian 13
  public get tickets(): Ticket[] {
    return this.asignedTickets.slice(0, 13);
  }

  public findAll (): Ticket[] {
    return this.tickets;
  }

  create() {
    const newTicket: Ticket = {
      id: setUUID(),
      no: this.nextTicketNumer,
    };
    this.pendingTickets = [...this.pendingTickets, newTicket];
    return newTicket;
  }

  asignTicket(agent: string, desktop: number): Ticket | undefined {
    if (this.pendingTickets.length === 0) return;
    const nextTicket = this.pendingTickets.shift();
    nextTicket!.agent = agent;
    nextTicket!.desktop = desktop;

    this.asignedTickets.unshift(nextTicket!);
    return nextTicket!;
  }
}
