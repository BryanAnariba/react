import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatMessagesModule } from './chat-messages/chat-messages.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }), 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ChatMessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
