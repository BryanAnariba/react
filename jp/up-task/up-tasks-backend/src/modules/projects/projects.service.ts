import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { errorHandleExceptions } from 'src/common/exceptions/error-handle.exception';
import { User } from '../users/schemas/user.schemas';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    user: User,
  ): Promise<Project> {
    try {
      const project = await this.projectModel.create({
        ...createProjectDto,
        manager: user._id,
      });
      return await project.save();
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async findAll(user: User): Promise<Project[]> {
    try {
      const projects = await this.projectModel.find({
        isActive: true,
        manager: user._id,
      });
      return projects;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }


   async findOne(projectId: string): Promise<Project> {
    try {
      const project = await this.projectModel.findOne({ _id: projectId });
      if (!project)
        throw new HttpException(`Project not found`, HttpStatus.NOT_FOUND);

      return project;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async findOneAuth(projectId: string, user: User): Promise<Project> {
    try {
      const project = await this.projectModel.findOne({ _id: projectId });
      if (!project)
        throw new HttpException(`Project not found`, HttpStatus.NOT_FOUND);
      if (project.manager.toString() !== `${user._id as string}`)
        throw new BadRequestException(
          'You are not the manager of this project',
        );
      return project;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async update(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
    user: User
  ): Promise<Project> {
    try {
      await this.findOneAuth(projectId, user);
      const projectUpdated = await this.projectModel.findOneAndUpdate(
        { _id: projectId },
        { ...updateProjectDto },
        { new: true },
      );
      return projectUpdated!;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async remove(projectId: string, user: User): Promise<Project> {
    try {
      await this.findOneAuth(projectId, user);
      const projectUpdated = await this.projectModel.findOneAndUpdate(
        { _id: projectId },
        { isActive: false },
        { new: true },
      );
      return projectUpdated!;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }
}
