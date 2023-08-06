
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Type_enum } from './room_type.enum';



export type room_typeDocument = Document & Room_type;

@Schema()
export class Room_type {

    @Prop()
    _id: Type_enum ;

    @Prop()
    name: string;

    @Prop()
    beds: number;

    @Prop()
    description: string;

    
    @Prop()
    price: number;

}


export const Room_typeSchema = SchemaFactory.createForClass(Room_type);