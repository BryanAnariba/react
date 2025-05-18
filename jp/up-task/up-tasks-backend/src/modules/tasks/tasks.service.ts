import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model, Types } from 'mongoose';
import { ProjectsService } from '../projects/projects.service';
import { errorHandleExceptions } from 'src/common/exceptions/error-handle.exception';
import { ChangeTaskStatusDto } from './dto/change-task-status.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(projectId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      await this.projectsService.findOne(projectId);
      const loadedTask = await this.taskModel.create({
        ...createTaskDto,
        project: new Types.ObjectId(projectId),
      });
      return await loadedTask.save();
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async findAll(projectId: string): Promise<Task[]> {
    try {
      const tasks = await this.taskModel
        .find({ project: new Types.ObjectId(projectId), isActive: true });
        //.populate('project', 'projectName clientName description isActive');
      return tasks;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async findOne(projectId: string, taskId: string): Promise<Task> {
    try {
      const task = await this.taskModel
        .findOne({ _id: taskId, project: new Types.ObjectId(projectId) });
        //.populate('project', 'projectName clientName description isActive');
      if (!task)
        throw new HttpException(
          'Task not found or task is not asigned to project.',
          HttpStatus.NOT_FOUND,
        );
      return task;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async update(
    projectId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    try {
      const taskUpdated = await this.taskModel.findOneAndUpdate(
        { _id: taskId, project: new Types.ObjectId(projectId) },
        { ...updateTaskDto },
        { new: true },
      );
      if (!taskUpdated)
        throw new HttpException('Task was not found.', HttpStatus.NOT_FOUND);
      return taskUpdated;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async changeTaskStatus(
    projectId: string,
    taskId: string,
    changeTaskStatus: ChangeTaskStatusDto,
  ): Promise<Task> {
    try {
      const taskUpdated = await this.taskModel.findOneAndUpdate(
        { project: new Types.ObjectId(projectId), _id: taskId },
        { status: changeTaskStatus.status },
        { new: true },
      );
      if (!taskUpdated)
        throw new HttpException('Task was not found.', HttpStatus.NOT_FOUND);
      return taskUpdated;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async remove(projectId: string, taskId: string): Promise<Task> {
    try {
      await this.findOne(projectId, taskId)
      const taskUpdated = await this.taskModel.findOneAndUpdate(
        { _id: taskId },
        { isActive: false },
        { new: true },
      );
      if (!taskUpdated)
        throw new HttpException('Task was not found.', HttpStatus.NOT_FOUND);
      return taskUpdated;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }
}
