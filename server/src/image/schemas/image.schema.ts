
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Type_enum } from 'src/room_type/schemas/room_type.enum';

export type ImageSchema = Document & Image;

@Schema()
export class Image {
  map(arg0: (image: any) => Promise<void>) {
    throw new Error('Method not implemented.');
  }
  @Prop()
  _id: string;

  @Prop()
  image: string;

  @Prop()
  contentType: string;

  @Prop()
  typeRoom: Type_enum;

  length: number;
}


export const ImageSchema = SchemaFactory.createForClass(Image);