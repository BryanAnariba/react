import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchemaFactory } from './schemas/task.schema';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchemaFactory }]),
    ProjectsModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
