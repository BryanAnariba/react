import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({versionKey: false, timestamps: true})
export class User extends Document {

  @Prop({ required: [true, 'Name is required'], trim: true })
  public name: string;

  @Prop({ required: [true, 'Email is required'], trim: true, unique: true })
  public email: string;

  @Prop({ required: [true, 'Password is required'], trim: true })
  public password: string;

  @Prop({ default: true })
  public isActive: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);
