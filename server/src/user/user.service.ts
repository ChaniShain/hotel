import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async create(user: User): Promise<User> {
        // const newUser = new this.userModel(user);
        // return newUser.save();
        const { password, ...userData } = user;
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const newUserHush = new this.userModel({ ...userData, password: hashedPassword });
        return newUserHush.save();
    }

    async readAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async readById(_id): Promise<User> {
        return await this.userModel.findById(_id).exec();
    }

    async update(id, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, { new: true })
    }

    async delete(id): Promise<any> {
        return await this.userModel.findByIdAndRemove(id);
    }


}
