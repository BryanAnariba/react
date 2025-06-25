import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IsObjectIdPipe } from 'src/common/pipes/is-object-id.pipe';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/schemas/user.schemas';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Auth()
  create(@Body() createProjectDto: CreateProjectDto, @GetUser() user: User) {
    return this.projectsService.create(createProjectDto, user);
  }

  @Get()
  @Auth()
  findAll(
    @GetUser() user: User,
  ) {
    return this.projectsService.findAll(user);
  }

  @Get(':projectId')
  @Auth()
  findOne(@Param('projectId', IsObjectIdPipe) projectId: string, @GetUser() user: User) {
    return this.projectsService.findOneAuth(projectId, user);
  }

  @Patch(':projectId')
  @Auth()
  update(@Param('projectId', IsObjectIdPipe) projectId: string, @Body() updateProjectDto: UpdateProjectDto, @GetUser() user: User,) {
    return this.projectsService.update(projectId, updateProjectDto, user);
  }

  @Delete(':projectId')
  @Auth()
  remove(@Param('projectId', IsObjectIdPipe) projectId: string, @GetUser() user: User,) {
    return this.projectsService.remove(projectId, user);
  }
}
