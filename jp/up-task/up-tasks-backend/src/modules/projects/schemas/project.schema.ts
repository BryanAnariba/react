import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  })
  public manager: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
