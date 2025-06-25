import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from '../enums';
import { Document, Types } from 'mongoose';

export interface ITask extends Document {
  name: string;
  description: string;
  project: Types.ObjectId;
  status: TaskStatus;
  isActive: boolean;
}

@Schema({ versionKey: false, timestamps: true })
export class Task extends Document {
  @Prop({ type: String, required: true, trim: true })
  public name: string;

  @Prop({ type: String, required: false, trim: true, default: '' })
  public description: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project is required'],
  })
  project: Types.ObjectId;

  @Prop({ enum: TaskStatus, default: TaskStatus.PENDING })
  public status: TaskStatus;

  @Prop({ type: Boolean, default: true })
  public isActive: boolean;
}

export const TaskSchemaFactory = SchemaFactory.createForClass<ITask>(Task);
