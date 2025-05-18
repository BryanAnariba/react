import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class AuthToken extends Document {
  @Prop({ type: String, required: [true, 'Token is required'] })
  public token: string;

  @Prop({
    type: Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User',
  })
  public userId: string;

  @Prop({ type: Date, default: Date.now(), expires: '1h' })
  public createdAt: Date;
}

export const AuthTokenSchema = SchemaFactory.createForClass(AuthToken);
