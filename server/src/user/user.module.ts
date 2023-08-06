
import { Module ,forwardRef} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/role/role.guard';
import { AuthModule } from 'src/auth/auth.module';



@Module({
  imports: [AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService ],
 
})
export class UserModule {

}

