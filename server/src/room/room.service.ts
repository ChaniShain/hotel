import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Room } from './schemas/room.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoomService {
    constructor(@InjectModel('Room') private roomModel: Model<Room>) { }


    async create(room: Room): Promise<Room> {
        const newRoom = new this.roomModel(room);
        return newRoom.save();
    }

    async readAll(): Promise<Room[]> {
        return await this.roomModel.find().exec();
    }

    async readById(id): Promise<Room[]> {
        return await this.roomModel.find({ id }).exec();
    }

    async readByType(type): Promise<Room[]> {
        return await this.roomModel.find({ type }).exec();
    }
   

    async update(id, room: Room): Promise<Room> {
        const existRoom = await this.roomModel.findById(id);
        const existingEntryDate = existRoom.EntryDate;
        const existingReleaseDate = existRoom.ReleaseDate;
        existingEntryDate.push(...room.EntryDate);
        existingReleaseDate.push(...room.ReleaseDate);
        existingEntryDate.sort((a, b) => a.getTime() - b.getTime());
        existingReleaseDate.sort((a, b) => a.getTime() - b.getTime());
        room.EntryDate = existingEntryDate;
        room.ReleaseDate = existingReleaseDate;
        return await this.roomModel.findByIdAndUpdate(id, room, { new: true });
    }

    // try
    async updateTemporary(id, room: Room): Promise<Room> {
        const existRoom = await this.roomModel.findById(id);
        const existingEntryDate = existRoom.temporaryEntryDate;
        const existingReleaseDate = existRoom.temporaryReleaseDate;
        existingEntryDate.push(...room.temporaryEntryDate);
        existingReleaseDate.push(...room.temporaryReleaseDate);
        existingEntryDate.sort((a, b) => a.getTime() - b.getTime());
        existingReleaseDate.sort((a, b) => a.getTime() - b.getTime());
        room.temporaryEntryDate = existingEntryDate;
        room.temporaryReleaseDate = existingReleaseDate;
        // return await existRoom.save();
        return await this.roomModel.findByIdAndUpdate(id, room, { new: true });

      }
      

    async delete(id): Promise<any> {
        return await this.roomModel.findByIdAndDelete(id);
    }
}
