
import { Bind, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { Role } from "src/auth/role/role.enum";
import { Roles } from "src/auth/role/roles.decorator";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    
  @Post()
  @Roles(Role.Admin)
   async createUser(@Res() response, @Body() user: User) {
      const newUser = await this.userService.create(user);
      
      return response.status(HttpStatus.CREATED).json({
          newUser
      })
  }

  @Get()
  @Roles(Role.Admin)
  async fetchAll(@Res() response) {
    console.log("get")
      const user = await this.userService.readAll();
      return response.status(HttpStatus.OK).json({
          user
      })
  }

  @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
      const user = await this.userService.readById(id);
      return response.status(HttpStatus.OK).json({
          user
      })
  }

  @Put('/:id')
  @Roles(Role.Admin)
  async update(@Res() response, @Param('id') id, @Body() user: User) {
      const updatedUser = await this.userService.update(id, user);
      return response.status(HttpStatus.OK).json({
        updatedUser
      })
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  async delete(@Res() response, @Param('id') id) {
      const deletedUser = await this.userService.delete(id);
      return response.status(HttpStatus.OK).json({
        deletedUser
      })
  }
}
