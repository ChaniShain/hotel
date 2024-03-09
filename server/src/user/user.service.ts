import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: Model<User>) { }
  
    async create(user: User): Promise<User> {
        // take the password field 
        const { password, ...userData } = user;
        // Set the number of rounds for hashing the password
        const saltOrRounds = 10;
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        // Create a new user  with hashed password
        const newUserHush = new this.userModel({ ...userData, password: hashedPassword });
        return newUserHush.save();
    }

    async readAll(): Promise<User[]> {
        return await this.userModel.find({ isActive: true }).exec();
    }

    async readById(_id): Promise<User> {
        return await this.userModel.findOne({ _id, isActive: true }).exec();
    }

    async update(id, user: User): Promise<User> {
     
        return await this.userModel.findByIdAndUpdate(id, user, { new: true })
    }

    // async delete(id): Promise<any> {
    //     return await this.userModel.findByIdAndRemove(id);
    // }

    async delete(id): Promise<any> {
        return await this.userModel.findByIdAndUpdate(id, { $set: { isActive: false } })
    }



}
