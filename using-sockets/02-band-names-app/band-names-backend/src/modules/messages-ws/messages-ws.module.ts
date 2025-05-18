import { Module } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { MessagesWsGateway } from './messages-ws.gateway';
import { BandsModule } from '../bands/bands.module';

@Module({
  imports: [BandsModule],
  providers: [MessagesWsGateway, MessagesWsService],
})
export class MessagesWsModule {}
