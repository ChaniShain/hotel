

import { Controller, Post, UseInterceptors, UploadedFile, SetMetadata, Res, Get, Param, NotFoundException, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { ImageService } from './image.service';
import { IS_PUBLIC_KEY } from 'src/auth/decorator/public.decorator';
import { Response } from 'express';
import { join } from 'path';
import { type } from 'os';
import { Type_enum } from 'src/room_type/schemas/room_type.enum';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }
  @SetMetadata(IS_PUBLIC_KEY, true)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `./images`,
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File,
    @Body('_id') _id: string, @Body('typeRoom') typeRoom: Type_enum,
  ) {
    const image = file.path;
    const contentType = file.mimetype;


    return this.imageService.create(_id, image, contentType, typeRoom);

  }

  @SetMetadata(IS_PUBLIC_KEY, true)
  @Get(':type')
  async findByType(@Param('type') type: Type_enum, @Res() res: Response) {

    const images = await this.imageService.readById(type);
    console.log (images)
    if (!images || images.length === 0) {
      throw new NotFoundException('Image not found');
    }
    
    // res.header('Content-Disposition', 'inline');
    const filePromises = images.map(async (image) => {
 
     
          const typeRoom = image.typeRoom;
          const { image: imagePath } = image;
          const imagePathSplit = imagePath.split("\\");
          res.contentType(image.contentType);
          return res.sendFile(join(__dirname, '..', '..', 'src', 'images', typeRoom, imagePathSplit[1]));
        });
      //  console.log(filePromises)
        // await Promise.all(filePromises);
      }
    // return res.json(images);
  


  @SetMetadata(IS_PUBLIC_KEY, true)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const image = await this.imageService.findById(id);
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    const typeRoom = image.typeRoom;
    const { image: imagePath } = image;
    const imagePathSplit = imagePath.split("\\");
    res.contentType(image.contentType);
    res.sendFile(join(__dirname, '..', '..', 'src', 'images', typeRoom, imagePathSplit[1]));

  }
}

