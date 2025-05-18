import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TicketsWsModule } from './modules/tickets-ws/tickets-ws.module';
import { TicketsModule } from './modules/tickets/tickets.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ['.env'] }), TicketsWsModule, TicketsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
