import { Bind, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, SetMetadata } from "@nestjs/common";
import { TaskService } from './task.service';
import { Task } from './schemas/task.schema';
import { IS_PUBLIC_KEY } from "src/auth/decorator/public.decorator";
import { Role } from "src/auth/role/role.enum";
import { Roles } from "src/auth/role/roles.decorator";

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService){}
   
    @SetMetadata(IS_PUBLIC_KEY, true)
    @Post()
       async createTask(@Res() response, @Body() task: Task) {
        const newTask = await this.taskService.create(task);
            return response.status(HttpStatus.CREATED).json({
            newTask
        })
    }
  
    @Get()
    @Roles(Role.Admin)
    async fetchAll(@Res() response) {
      console.log("get")
        const task = await this.taskService.readAll();
        return response.status(HttpStatus.OK).json({
            task
        })
    }

    @Get('/byTime/:num')
    @Roles(Role.Admin)
    async findByTime(@Res() response, @Param('num') num) {
      console.log("get-time")
        const task = await this.taskService.readByTime(num);
        return response.status(HttpStatus.OK).json({
            task
        })
    }
  
    @Get('/allByTime')
    @Roles(Role.Admin)
    async findAllByTime(@Res() response) {
      console.log("get-time")
        const task = await this.taskService.readAllByTime();
        return response.status(HttpStatus.OK).json({
            task
        })
    } 

    @Get('/isMove')
    @Roles(Role.Admin)
    async ifMove(@Res() response) {
      console.log("get")
        const task = await this.taskService.readAdmin();
        return response.status(HttpStatus.OK).json({
            task
        })
    }
  
   
    @Get('/:job')
    async findById(@Res() response, @Param('job') job) {
         const task = await this.taskService.readById(job);
      return response.status(HttpStatus.OK).json({
          task
      })
  }
  
    @Put('/:id')
    @Roles(Role.User)
    async update(@Res() response, @Param('id') id, @Body() task: Task) {
        console.log(id)
        const updatedTask = await this.taskService.update(id, task);
        return response.status(HttpStatus.OK).json({
            updatedTask
        })
    }
  
    @Delete('/:id')
    @Roles(Role.User)
    async delete(@Res() response, @Param('id') id) {
        const deletedTask = await this.taskService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedTask
        })
    }
}


