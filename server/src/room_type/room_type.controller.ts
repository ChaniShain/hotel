import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, SetMetadata } from '@nestjs/common';
import { RoomTypeService } from './room_type.service';
import { IS_PUBLIC_KEY } from 'src/auth/decorator/public.decorator';
import { Role } from 'src/auth/role/role.enum';
import { Roles } from 'src/auth/role/roles.decorator';
import { Task } from 'src/task/schemas/task.schema';
import { Room_type } from './schemas/room_type.schema';
import { RoomService } from 'src/room/room.service';

@Controller('room_type')
export class RoomTypeController {
    constructor(private readonly room_typeService: RoomTypeService,
        private readonly room_Service :RoomService) { }

    @SetMetadata(IS_PUBLIC_KEY, true)
    @Post()
    async createRoom_type(@Res() response, @Body() room_type: Room_type) {
        const newRoom_type = await this.room_typeService.create(room_type);
        return response.status(HttpStatus.CREATED).json({
            newRoom_type
        })
    }
    @SetMetadata(IS_PUBLIC_KEY, true)
    @Get()
    async fetchAll(@Res() response) {
        const room_type = await this.room_typeService.readAll();
        return response.status(HttpStatus.OK).json({
            room_type
        })
    }

    @SetMetadata(IS_PUBLIC_KEY, true)
    @Get('/:type')
    async findById(@Res() response, @Param('type') type) {
        const room_type = await this.room_typeService.readById(type);
        return response.status(HttpStatus.OK).json({
            room_type
        })
    }

    @SetMetadata(IS_PUBLIC_KEY, true)
    
    @Get('/bedsNum/:bedsNum')
    async findBybedsNum(@Res() response, @Param('bedsNum') num) {
        const room_type = await this.room_typeService.readByNumBeds(num);
        // console.log(room_type)
        return response.status(HttpStatus.OK).json({
            room_type
        })
    }

    @Put('/:type')
    @Roles(Role.User)
    async update(@Res() response, @Param('type') type, @Body() room_type: Room_type) {
        const updatedType = await this.room_typeService.update(type, room_type);
        return response.status(HttpStatus.OK).json({
            updatedType
        })
    }
    @SetMetadata(IS_PUBLIC_KEY, true)
    @Delete('/:type')
    async delete(@Res() response, @Param('type') type) {
        const deletedType = await this.room_typeService.delete(type);
        return response.status(HttpStatus.OK).json({
            deletedType
        })
    }
}
