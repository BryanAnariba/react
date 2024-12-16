import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { MinLength } from 'class-validator';

@Schema({timestamps: true, versionKey: false})
export class User extends Document {

  @Prop({ required: [true, 'Name is required'], trim: true, uppercase: true})
  public name: string;

  @Prop({ required: [true, 'Email is required'], trim: true, lowercase: true, unique: true })
  public email: string;

  @Prop({ required: [true, 'Password is required'], trim: true, MinLength: 6 })
  public password: string;

  @Prop({ default: true })
  public isActive: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);
