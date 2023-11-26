import { Module } from '@nestjs/common';
import { RoomTypeController } from './room_type.controller';
import { RoomTypeService } from './room_type.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room_type ,Room_typeSchema} from './schemas/room_type.schema';
import { Room ,RoomSchema} from 'src/room/schemas/room.schema';
import {RoomService} from 'src/room/room.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Room_type.name, schema: Room_typeSchema}]),
  MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),],
  controllers: [RoomTypeController],
  providers: [RoomTypeService,RoomService],
  exports:[RoomTypeService]

})
export class RoomTypeModule {}

