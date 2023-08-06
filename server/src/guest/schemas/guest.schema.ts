
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GuestDocument = Document & Guest;

@Schema()
export class Guest {

    @Prop()
    _id: string;

    @Prop()
    name: string;

    @Prop()
    roomNum: number;
    
    @Prop()
    nightNum:number;

    @Prop()
    payment:number;

   

    @Prop()
    credit: string;

    @Prop()
    EntryDate: Date;

    @Prop()
    ReleaseDate: Date;
}


export const GuestSchema = SchemaFactory.createForClass(Guest);