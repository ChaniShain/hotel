
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/role/role.enum';
import { Job } from 'src/task/schemas/task.enum';

export type UserDocument = Document & User;

@Schema()
export class User {
    @Prop({ required: true })
    _id: string;

    @Prop()
    password: string;

    @Prop()
    job:Job;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    roles: Role[];
}


export const UserSchema = SchemaFactory.createForClass(User);