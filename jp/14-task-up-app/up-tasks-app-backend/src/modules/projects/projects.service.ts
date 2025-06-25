import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { errorHandleExceptions } from 'src/common/exceptions/error-handle.exception';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      const project = this.projectModel.create(createProjectDto);
      return (await project).save();
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async findAll(): Promise<Project[]> {
    try {
      const projects = await this.projectModel.find({ isActive: true });
      return projects;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async findOne(projectId: string): Promise<Project> {
    try {
      const project = await this.projectModel
        .findOne({ _id: projectId, isActive: true })
        .populate('tasks');
      if (!project)
        throw new NotFoundException(`Projecto ${projectId} no encontrado.`);
      return project;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async update(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    try {
      await this.findOne(projectId);
      const updatedProject = await this.projectModel.findOneAndUpdate(
        { _id: projectId },
        { ...updateProjectDto },
        { new: true },
      );
      return updatedProject!;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  async remove(projectId: string): Promise<Project> {
    try {
      await this.findOne(projectId);
      const updatedProject = await this.projectModel.findOneAndUpdate(
        { _id: projectId },
        { isActive: false },
        { new: true },
      );
      return updatedProject!;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }
}
