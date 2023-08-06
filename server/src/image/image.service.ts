
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './schemas/image.schema';
import { Type_enum } from 'src/room_type/schemas/room_type.enum';

@Injectable()
export class ImageService {
  
  constructor(@InjectModel(Image.name) private readonly imageModel: Model<Image>) {}

  async create(_id: string, image: string, contentType: string,typeRoom:Type_enum): Promise<Image> {
    const newImage = new this.imageModel({ _id, image, contentType ,typeRoom});
    return newImage.save();
  }

  async findAll(): Promise<Image[]> {
    return this.imageModel.find().exec();
  }

  async findById(id: string): Promise<Image | null> {
    return this.imageModel.findById(id).exec();
  }
  
  async getImageById(id: string) {
    return await this.imageModel.findById(id).exec();
  }

  async readById(typeRoom:Type_enum): Promise<Image[] | null> {
    return await this.imageModel.find({ typeRoom }).exec();
}

}

