import { Injectable } from '@nestjs/common';
import { Room_type } from './schemas/room_type.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from 'src/room/schemas/room.schema';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class RoomTypeService {  constructor(@InjectModel('Room_type') private room_typeModel: Model<Room_type>,
@InjectModel('Room') private room_Model: Model<Room>) { }
// @InjectModel('Room') private roomModel: Model<Room> 
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
// async readById(_id): Promise<Room_type[]> {
//     return await this.room_typeModel.find({ _id }).exec();
// }
// async readById(_id,num): Promise<Room[]> {
//   await this.room_typeModel.find({ _id }).exec();
//     return await this.roomModel.find({ _id }).exec();
// }
async readByNumBeds(minNumBeds: number): Promise<Room[]> {
   let roomList=[];
    const response= await this.room_typeModel.find ({ beds: { $gte: minNumBeds } }).exec();
   console.log(response)
   console.log(response[0]._id);

    for (let i = 0; i < response.length; i++) {
        let room= await this.room_Model.find({type:response[i]._id})

              roomList.push(room);  
    }
  

    console.log(roomList)
    return roomList;
  }

  
async update(id, room_type: Room_type): Promise<Room_type> {
    return await this.room_typeModel.findByIdAndUpdate(id, room_type, { new: true })
}

async delete(id): Promise<any> {
    return await this.room_typeModel.findByIdAndDelete(id);
}

}
