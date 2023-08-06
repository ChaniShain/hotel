
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {  Type_enum } from 'src/room_type/schemas/room_type.enum';




export type roomDocument = Document & Room;

@Schema()
export class Room {

    @Prop()
    _id: string;

    @Prop()
    type: Type_enum ;



    @Prop({ type: [Date] })
    EntryDate: Date[];

    @Prop({ type:  [Date]})
    ReleaseDate: Date[];

}


export const RoomSchema = SchemaFactory.createForClass(Room);