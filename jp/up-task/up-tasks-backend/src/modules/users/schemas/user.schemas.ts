import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoles } from '../enums';

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  @Prop({
    type: String,
    required: [true, 'User email is required'],
    unique: true,
    trim: true,
  })
  public email: string;

  @Prop({
    type: String,
    required: [true, 'User password is required'],
    trim: true,
    minlength: 6,
  })
  public password: string;

  @Prop({
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    minlength: 3,
  })
  public name: string;

   @Prop({
    type: Array,
    required: [true, 'User rple is required'],
    default: [UserRoles.USER]
  })
  public roles: UserRoles[];

  @Prop({ type: Boolean, default: false })
  public confirmed: boolean;

  @Prop({ type: Boolean, default: true })
  public isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
