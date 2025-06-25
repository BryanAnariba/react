import { Module } from '@nestjs/common';
import { TicketsWsGateway } from './tickets-ws.gateway';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
  imports: [TicketsModule],
  providers: [TicketsWsGateway],
})
export class TicketsWsModule {}
