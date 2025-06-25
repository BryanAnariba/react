import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './modules/projects/projects.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(`${process.env.MONGO_CONNECTION_URL}`),
    ProjectsModule,
    AuthModule,
    CommonModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
