import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TicketsModule } from './modules/tickets/tickets.module';
import { TicketsWsModule } from './modules/tickets-ws/tickets-ws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TicketsModule,
    TicketsWsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
