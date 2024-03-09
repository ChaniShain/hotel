import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Room } from './schemas/room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { every } from 'rxjs';

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

    async readById(_id): Promise<Room[]> {
        const r = await this.roomModel.find({ _id }).exec();
        console.log("r", r, _id)
        return r;
    }

    async readByType(type): Promise<Room[]> {
        return await this.roomModel.find({ type }).exec();
    }

    // Update room with push the dates sorts
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
    async updateRemoveTemporary(id, room: Room): Promise<Room> {
        return await this.roomModel.findByIdAndUpdate(id, room, { new: true });

    }
    async updateAddTemporary(id, room: Room): Promise<Room> {

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

    //   async deleteTemporary(id, EntryDate,EntryDate): Promise<Room> {
    //     console.log("d")
    //     const existRoom = await this.roomModel.findById(id);
    //     const existingEntryDate = existRoom.temporaryEntryDate;
    //     const existingReleaseDate = existRoom.temporaryReleaseDate;
    //     existingEntryDate.push(...room.temporaryEntryDate);
    //     existingReleaseDate.push(...room.temporaryReleaseDate);
    //     existingEntryDate.sort((a, b) => a.getTime() - b.getTime());
    //     existingReleaseDate.sort((a, b) => a.getTime() - b.getTime());
    //     room.temporaryEntryDate = existingEntryDate;
    //     room.temporaryReleaseDate = existingReleaseDate;
    //     // return await existRoom.save();
    //     return await this.roomModel.findByIdAndUpdate(id, room, { new: true });

    //   }


    async delete(id): Promise<any> {
        return await this.roomModel.findByIdAndDelete(id);
    }

    //    every night 4 oclock erase the temporary arrays
    @Cron('0 4 * * * ')
    async handleCron() {
        try {
            await this.roomModel.updateMany({}, { $set: { temporaryEntryDate: [], temporaryReleaseDate: [] } });
        } catch (error) {
            console.error('Error deleting temporary dates:', error);
        }
    }
}
