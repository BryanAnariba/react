import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum TaskStatus {
  PENDING = 'PENDING',
  ON_HOLD = 'ON_HOLD',
  IN_PROGRESS = 'IN_PROGRESS',
  UNDER_REVIEW = 'UNDER_REVIEW',
  COMPLETED = 'COMPLETED',
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
  project: string;

  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.PENDING })
  public status: string;

  @Prop({ type: Boolean, default: true })
  public isActive: boolean;

}

export const TaskSchema = SchemaFactory.createForClass(Task);
