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
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { ChangeStatusDto } from './dto/chage-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('project/:projectId')
  create(
    @Param('projectId', ParseObjectIdPipe) projectId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(projectId, createTaskDto);
  }

  @Get('project/:projectId')
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('project/:projectId/task/:taskId')
  findOne(
    @Param('projectId', ParseObjectIdPipe) projectId: string,
    @Param('taskId', ParseObjectIdPipe) taskId: string,
  ) {
    return this.tasksService.findOne(projectId, taskId);
  }

  @Patch('project/:projectId/task/:taskId')
  update(
    @Param('projectId', ParseObjectIdPipe) projectId: string,
    @Param('taskId', ParseObjectIdPipe) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(projectId, taskId, updateTaskDto);
  }

  @Post('project/:projectId/task/:taskId/change-status')
  changeStatus(
    @Param('projectId', ParseObjectIdPipe) projectId: string,
    @Param('taskId', ParseObjectIdPipe) taskId: string,
    @Body() changeStatusDto: ChangeStatusDto,
  ) {
    return this.tasksService.changeStatus(projectId, taskId, changeStatusDto);
  }

  @Delete('project/:projectId/task/:taskId')
  remove(
    @Param('projectId', ParseObjectIdPipe) projectId: string,
    @Param('taskId', ParseObjectIdPipe) taskId: string,
  ) {
    return this.tasksService.remove(projectId, taskId);
  }
}
