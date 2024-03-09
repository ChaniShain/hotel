import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Guest } from './schemas/guest.schema';
import { Model } from 'mongoose';
import { RoomModule } from 'src/room/room.module';

@Injectable()
export class GuestService {  constructor(@InjectModel('Guest') private guestModel: Model<Guest>) { }

    
async create(guest: Guest): Promise<Guest> {
    const newGuest = new this.guestModel(guest);
    return newGuest.save();

  }

async readAll(): Promise<Guest[]> {
    return await this.guestModel.find().exec();
}

async readById(id): Promise<Guest  | null> {
    return await this.guestModel.findOne({id}).exec();
   
    
    
}

async update(id, guest: Guest): Promise<Guest> {
    return await this.guestModel.findByIdAndUpdate(id, guest, { new: true })
}

async delete(id): Promise<Guest> {
    return await this.guestModel.findByIdAndDelete(id);
}}
