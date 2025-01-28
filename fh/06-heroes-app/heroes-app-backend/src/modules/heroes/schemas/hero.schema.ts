import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Publisher } from "../enums";

@Schema({ versionKey: false, timestamps: true })
export class Hero extends Document {

  @Prop({ required: [true, 'Field hero_id is required.'], trim: true })
  public readonly hero_id: string;

  @Prop({ required: [true, 'Field superhero is required.'], trim: true })
  public superhero: string;

  @Prop({ required: [true, 'Field publisher is required.'], trim: true, enum: Publisher })
  public publisher: Publisher;

  @Prop({ required: [true, 'Field alter_ego is required.'], trim: true })
  public alter_ego: string;

  @Prop({ required: [true, 'Field first_appearance is required.'], trim: true })
  public first_appearance: string;

  @Prop({ required: [true, 'Field characters is required.'], trim: true })
  public characters: string;

}

export const HeroSchema = SchemaFactory.createForClass(Hero);
