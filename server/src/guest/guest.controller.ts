import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/auth/decorator/public.decorator';
import { GuestService } from './guest.service';
import { Guest } from './schemas/guest.schema';

@Controller('guest')
export class GuestController {
    constructor(private readonly guestService: GuestService) { }

    @SetMetadata(IS_PUBLIC_KEY, true)
    @Post()
    async createGuest(@Res() response, @Body() guest: Guest) {
        const newGuest= await this.guestService.create(guest);
        return response.status(HttpStatus.CREATED).json({
            newGuest
        })
    }
    @SetMetadata(IS_PUBLIC_KEY, true)
    @Get()
    async fetchAll(@Res() response) {
        const guest = await this.guestService.readAll();
        return response.status(HttpStatus.OK).json({
            guest
        })
    }

   
    @SetMetadata(IS_PUBLIC_KEY, true)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const guest= await this.guestService.readById(id);
        return response.status(HttpStatus.OK).json({
            guest
        })
    }

    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() guest: Guest) {
        const updatedGuest = await this.guestService.update(id, guest);
        return response.status(HttpStatus.OK).json({
            updatedGuest
        })
    }
    @SetMetadata(IS_PUBLIC_KEY, true)
    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        const deletedGuest= await this.guestService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedGuest
        })
    }
}
