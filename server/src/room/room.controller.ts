import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, SetMetadata } from '@nestjs/common';
import { RoomService } from './room.service';
import { IS_PUBLIC_KEY } from 'src/auth/decorator/public.decorator';
import { Room } from './schemas/room.schema';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @SetMetadata(IS_PUBLIC_KEY, true)
    @Post()
    async createRoom(@Res() response, @Body() room: Room) {
        const newRoom = await this.roomService.create(room);
        return response.status(HttpStatus.CREATED).json({
            newRoom
        })
    }
    @SetMetadata(IS_PUBLIC_KEY, true)
    @Get()
    async fetchAll(@Res() response) {
        const room = await this.roomService.readAll();
        return response.status(HttpStatus.OK).json({
            room
        })
    }

    
    @SetMetadata(IS_PUBLIC_KEY, true)
    @Get('/:id')
    async findById(@Res() response, @Param('id') type) {
        const room = await this.roomService.readById(type);
        return response.status(HttpStatus.OK).json({
            room
        })
    }

    
    @SetMetadata(IS_PUBLIC_KEY, true)
    @Get('/type/:type')
    async findByType(@Res() response, @Param('type') type) {
        const rooms = await this.roomService.readByType(type);
        return response.status(HttpStatus.OK).json({
            rooms
        });
    }
    @SetMetadata(IS_PUBLIC_KEY, true)
    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() room: Room) {
        const updatedRoom = await this.roomService.update(id, room);
        return response.status(HttpStatus.OK).json({
            updatedRoom
        })
    }
    @SetMetadata(IS_PUBLIC_KEY, true)
    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        const deletedRoom = await this.roomService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedRoom
        })
    }
}

