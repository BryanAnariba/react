import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: [true, 'Role is required'], ref: 'Role' })
  role: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
