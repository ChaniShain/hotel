import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { ImageSchema ,Image} from './schemas/image.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema}])],
  providers: [ImageService],
  controllers: [ImageController],
  exports:[ImageService]
})
export class ImageModule {}
