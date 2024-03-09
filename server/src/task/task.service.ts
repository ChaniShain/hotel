import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import { Cron } from '@nestjs/schedule';
const moment = require('moment');

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private taskModel: Model<Task>) { }

    async create(task: Task): Promise<Task> {
        const newTask = new this.taskModel(task);
        return newTask.save();

    }

    async readAll(): Promise<Task[]> {
        return await this.taskModel.find({ isDone: true }).exec();
    }

    async readByTime(num: number): Promise<Task[]> {
        let startDate;
    console.log("sd",num)
        // קביעת תאריך התחלת הטווח בהתאם לערך של `num`
        if (num == 0) {
            // אחרון יום
            startDate = moment().subtract(1, 'day').startOf('day');
        } else if (num == 25) {
            // אחרון שבוע
            startDate = moment().subtract(1, 'week').startOf('week');
        } else if (num == 50) {
            // אחרון חודש
            startDate = moment().subtract(1, 'month').startOf('month');
        } else if (num == 75) {
            // שלושה חודשים אחרונים
            startDate = moment().subtract(3, 'months').startOf('month');
        } else if (num == 100) {
            // שישה חודשים אחרונים
            startDate = moment().subtract(6, 'months').startOf('month');
        } else {
            // טווח זמן לא מוכר
            throw new Error('Invalid value for num');
        }
    
        try {
            const tasks = await this.taskModel.find({
                isDone: true,
                date: { $gte: startDate.toDate() },
            }).exec();
    
            return tasks;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
        // const lastHourDate = moment().subtract(1, 'hour');

        // try {
        //     const tasks = await this.taskModel.find({
        //         isDone: true,
        //         date: { $gte: lastHourDate.toDate() },
        //     }).exec();

        //     return tasks;
        // } catch (error) {
        //     console.error('Error fetching tasks:', error);
        //     throw error;
        // }
    }

    // async readAll(): Promise<Task[]> {
    //     return await this.taskModel.find().exec();
    // }

    async readById(job): Promise<Task[]> {
        return await this.taskModel.find({ job, isDone: false, isMove: false }).exec();
    }

    async readAdmin(): Promise<Task[]> {
        return await this.taskModel.find({ isMove: true, isDone: false }).exec();
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
    // @Cron('0 16 * * * ') // delete the done tasks on Sunday at 12 at night 
    // async deleteCompletedTasks() {
    //     await this.taskModel.deleteMany({ isDone: true });
    // }

    async readAllByTime(): Promise<{ [key: string]: Task[] }> {
        const timeCategories = [0, 25, 50, 75, 100];
        const tasksByTime: { [key: string]: Task[] } = {};
    
        for (const num of timeCategories) {
            let startDate;
    
            if (num === 0) {
                startDate = moment().subtract(1, 'day').startOf('day');
            } else if (num === 25) {
                startDate = moment().subtract(1, 'week').startOf('week');
            } else if (num === 50) {
                startDate = moment().subtract(1, 'month').startOf('month');
            } else if (num === 75) {
                startDate = moment().subtract(3, 'months').startOf('month');
            } else if (num === 100) {
                startDate = moment().subtract(6, 'months').startOf('month');
            } else {
                throw new Error('Invalid value for num');
            }
    
            try {
                const tasks = await this.taskModel.find({
                    isDone: true,
                    date: { $gte: startDate.toDate() },
                }).exec();
    
                tasksByTime[num.toString()] = tasks;
            } catch (error) {
                console.error('Error fetching tasks:', error);
                throw error;
            }
        }
    
        return tasksByTime;
    }
    
}
