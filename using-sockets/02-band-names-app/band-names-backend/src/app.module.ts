import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BandsModule } from './modules/bands/bands.module';
import { MessagesWsModule } from './modules/messages-ws/messages-ws.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'public')}),
    ConfigModule.forRoot({ envFilePath: ['.env'] }), 
    BandsModule, 
    MessagesWsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
