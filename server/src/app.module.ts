import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/schemas/user.schema';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { RoomTypeModule } from './room_type/room_type.module';
import { RoomModule } from './room/room.module';
import { GuestModule } from './guest/guest.module';
// import { ImageModule } from './image/image.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({

  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/hotel'),

    TaskModule,
    UserModule,
    RoomTypeModule,
    RoomModule,
    GuestModule,
   
    ScheduleModule.forRoot(),


  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
