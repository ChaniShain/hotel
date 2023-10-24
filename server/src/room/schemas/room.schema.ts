
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Type_enum } from 'src/room_type/schemas/room_type.enum';




export type roomDocument = Document & Room;

@Schema()
export class Room {

    @Prop()
    _id: string;

    @Prop()
    type: Type_enum;


    @Prop({ type: [Date] })
    EntryDate: Date[];

    @Prop({ type: [Date] })
    ReleaseDate: Date[];
    // 

    @Prop({ type: [Date] })
    temporaryEntryDate:  Date[];

    @Prop({ type: [Date] })
    temporaryReleaseDate:  Date[];
    // @Prop({ type: [{ date: Date, time: String }] })
    // temporaryEntryDate:  Array<{ date: Date, time: String }>;

    // @Prop({ type: [{ date: Date, time: String }] })
    // temporaryReleaseDate:  Array<{ date: Date, time: String }>;

}


export const RoomSchema = SchemaFactory.createForClass(Room);