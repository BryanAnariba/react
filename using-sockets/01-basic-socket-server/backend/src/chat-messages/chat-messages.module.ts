import { Module } from '@nestjs/common';
import { ChatMessagesService } from './chat-messages.service';
import { ChatMessagesGateway } from './chat-messages.gateway';

@Module({
  providers: [ChatMessagesGateway, ChatMessagesService],
})
export class ChatMessagesModule {}
