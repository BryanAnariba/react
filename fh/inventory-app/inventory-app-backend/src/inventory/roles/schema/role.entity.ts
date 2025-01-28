import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true, versionKey: false })
export class Role extends Document {

  @Prop({ required: [true, 'Role Name is required'], trim: true, unique: true, uppercase: true })
  public name: string

  @Prop({ required: [true, 'Role Description is required'], trim: true, uppercase: true, default: '' })
  public description: string

  @Prop({ default: true })
  public isActive: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
