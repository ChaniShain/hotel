
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Job } from './task.enum';


export type TaskDocument = Document & Task;

@Schema()
export class Task {

    @Prop()
    job: Job;

    @Prop()
    location: string;

    @Prop()
    description: string;

    @Prop()
    isDone: boolean;

    @Prop()
    DoneBy: string;

    @Prop()
    isMove: boolean;

    @Prop()
    moveBy: string;

    @Prop()
    date: Date;


}


export const TaskSchema = SchemaFactory.createForClass(Task);