import { Injectable } from '@nestjs/common';
import { Room_type } from './schemas/room_type.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoomTypeService {  constructor(@InjectModel('Room_type') private room_typeModel: Model<Room_type>) { }

async create(room_type: Room_type): Promise<Room_type> {
    const newroom_type = new this.room_typeModel(room_type);
    return newroom_type.save();
  }

async readAll(): Promise<Room_type[]> {
    return await this.room_typeModel.find().exec();
}

async readById(_id): Promise<Room_type[]> {
    return await this.room_typeModel.find({ _id }).exec();
}

async update(id, room_type: Room_type): Promise<Room_type> {
    return await this.room_typeModel.findByIdAndUpdate(id, room_type, { new: true })
}

async delete(id): Promise<any> {
    return await this.room_typeModel.findByIdAndDelete(id);
}}
