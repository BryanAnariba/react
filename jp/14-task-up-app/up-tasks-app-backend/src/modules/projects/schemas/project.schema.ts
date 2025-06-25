import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, PopulatedDoc, Types } from 'mongoose';
import { ITask } from 'src/modules/tasks/schemas/task.schema';

export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  isActive: boolean;
  tasks: PopulatedDoc<ITask & Document>[];
};

@Schema({ versionKey: false, timestamps: true })
export class Project extends Document {
  @Prop({
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
  })
  public projectName: string;

  @Prop({
    type: String,
    required: [true, 'Client Name is required'],
    trim: true,
  })
  public clientName: string;

  @Prop({
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  })
  public description: string;

  @Prop({ type: Boolean, default: true })
  public isActive: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }], default: [] })
  public tasks: Types.ObjectId[];
}

export const ProjectSchemaFactory =
  SchemaFactory.createForClass<IProject>(Project);
