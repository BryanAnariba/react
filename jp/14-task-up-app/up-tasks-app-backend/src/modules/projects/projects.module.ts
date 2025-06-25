import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchemaFactory } from './schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchemaFactory },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchemaFactory },
    ]),
  ],
})
export class ProjectsModule {}
