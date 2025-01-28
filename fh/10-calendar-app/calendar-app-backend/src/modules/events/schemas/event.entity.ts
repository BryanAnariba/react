import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({versionKey: false, timestamps: true})
export class Event extends Document {

    @Prop({ required: [true, 'Field title is required'], trim: true, uppercase: true})
    public title: string;

    @Prop({ required: [true, 'Field notes is required'], trim: true, uppercase: true})
    public notes: string;

    @Prop({ required: [true, 'Field start date is required']})
    public start: Date;

    @Prop({ required: [true, 'Field end date is required']})
    public end: Date;

    @Prop({ required: [true, 'Field user is required'], ref: 'User', type: mongoose.Schema.Types.ObjectId, unique: false})
    public user: string;

    @Prop({ required: [true, 'Field bgColor is required']})
    public bgColor: string;

    @Prop({ default: true })
    public isActive: true;

}

export const EventSchema = SchemaFactory.createForClass(Event);
