import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { IsObjectIdPipe } from 'src/common/pipes/is-object-id.pipe';
import { ChangeTaskStatusDto } from './dto/change-task-status.dto';

@Controller('projects')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':projectId/add-task')
  create(
    @Param('projectId', IsObjectIdPipe) projectId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(projectId, createTaskDto);
  }

  @Get(':projectId/all-tasks')
  findAll(@Param('projectId', IsObjectIdPipe) projectId: string) {
    return this.tasksService.findAll(projectId);
  }

  @Get(':projectId/tasks/:taskId')
  findOne(
    @Param('projectId', IsObjectIdPipe) projectId: string,
    @Param('taskId', IsObjectIdPipe) taskId: string,
  ) {
    return this.tasksService.findOne(projectId, taskId);
  }

  @Patch(':projectId/tasks/:taskId/edit')
  update(
    @Param('projectId', IsObjectIdPipe) projectId: string,
    @Param('taskId', IsObjectIdPipe) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(projectId, taskId, updateTaskDto);
  }

  @Patch(':projectId/tasks/:taskId/change-status')
  changeStatus(
    @Param('projectId', IsObjectIdPipe) projectId: string,
    @Param('taskId', IsObjectIdPipe) taskId: string,
    @Body() changeTaskStatus: ChangeTaskStatusDto,
  ) {
    return this.tasksService.changeTaskStatus(
      projectId,
      taskId,
      changeTaskStatus,
    );
  }

  @Delete(':projectId/tasks/:taskId')
  remove(
    @Param('projectId', IsObjectIdPipe) projectId: string,
    @Param('taskId', IsObjectIdPipe) taskId: string
  ) {
    return this.tasksService.remove(projectId, taskId);
  }
}
