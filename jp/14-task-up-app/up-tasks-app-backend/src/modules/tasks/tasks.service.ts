import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { errorHandleExceptions } from 'src/common/exceptions/error-handle.exception';
import { Task } from './schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../projects/schemas/project.schema';
import { ChangeStatusDto } from './dto/chage-status.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}

  async create(
    projectId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<string> {
    try {
      const project = await this.projectModel.findOne({
        _id: projectId,
        isActive: true,
      });
      if (!project)
        throw new NotFoundException(
          `El proyecto ${projectId} no fue encontrado o está inactivo`,
        );
      const task = await this.taskModel.create({
        ...createTaskDto,
        project: projectId,
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      project.tasks.push(task.id);
      await Promise.allSettled([project.save(), task.save()]);
      return 'Tarea agregada al proyecto correctamente.';
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.taskModel
        .find({ isActive: true })
        .populate('project');
      return tasks;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async findOne(projectId: string, taskId: string): Promise<Task> {
    try {
      const task = await this.taskModel
        .findOne({
          _id: taskId,
          project: projectId,
          isActive: true,
        })
        .populate('project');
      if (!task) throw new NotFoundException(`Tarea ${taskId} no encontrada, o no pertenece al proyecto ${projectId}`);
      return task;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async update(
    projectId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    try {
      await this.findOne(projectId, taskId);
      const updated = await this.taskModel.findOneAndUpdate(
        { _id: taskId },
        { ...updateTaskDto },
        { new: true },
      );
      return updated!;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async changeStatus(
    projectId: string,
    taskId: string,
    changeStatusDto: ChangeStatusDto,
  ): Promise<Task> {
    try {
      await this.findOne(projectId, taskId);
      const updated = await this.taskModel.findOneAndUpdate(
        { _id: taskId },
        { status: changeStatusDto.status },
        { new: true },
      );
      return updated!;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async remove(projectId: string, taskId: string): Promise<string> {
    try {
      const [, project] = await Promise.all([
        this.findOne(projectId, taskId),
        this.projectModel.findOne({ _id: projectId, isActive: true }),
      ]);
      if (!project)
        throw new NotFoundException(
          `El proyecto ${projectId} no fue encontrado o está inactivo`,
        );
      const filteredTasks = project.tasks.filter(
        (task) => task.toString() !== taskId.toString(),
      );
      project.tasks = filteredTasks;
      await Promise.allSettled([
        project.save(),
        this.taskModel.findByIdAndDelete({ _id: taskId }),
      ]);
      return 'Tarea eliminada correctamente.';
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }
}
