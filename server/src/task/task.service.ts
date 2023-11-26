import { Injectable  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task,TaskSchema} from './schemas/task.schema';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private taskModel: Model<Task>) { }

    async create(task: Task): Promise<Task> {
        const newTask = new this.taskModel(task);
        return newTask.save();
      
    }

    async readAll(): Promise<Task[]> {
        return await this.taskModel.find({isDone:true}).exec();
    }
    // async readAll(): Promise<Task[]> {
    //     return await this.taskModel.find().exec();
    // }

    async readById(job): Promise<Task[]> {
        return await this.taskModel.find({ job, isDone: false ,isMove:false}).exec();
    }
    
    async readAdmin(): Promise<Task[]> {
        return await this.taskModel.find({  isMove: true ,isDone:false}).exec();
    }

    //   async readById(job): Promise<Task[]> {
    //     return await this.taskModel.find({ job }).exec();
    // }
 
    async update(id, task: Task): Promise<Task> {
        return await this.taskModel.findByIdAndUpdate(id, task, { new: true })
    }

    async delete(id): Promise<any> {
        return await this.taskModel.findByIdAndDelete(id);
    }
    @Cron('0 0 0 * * 0') // delete the done tasks on Sunday at 12 at night 
    async deleteCompletedTasks() {
      await this.taskModel.deleteMany({ isDone: true });
    }
}
