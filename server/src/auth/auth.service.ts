import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
@Dependencies(UserService,JwtService)
export class AuthService {
  constructor(public userService,public jwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }
async signIn(pass, id) {
    const user = await this.userService.readById(id);
  
      const  match = await bcrypt.compare(pass, user.password);
      console.log(match)


    if (!match) {
      throw new UnauthorizedException();
    }
    const payload = { pass: user.password, sub: user._id ,roles:user.roles};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  
  }

  async checkIfAdmin (token)  {
    try {
      const decodedToken = this.jwtService.decode(token);
      const roles = decodedToken.roles; 
      const isAdmin = roles.includes('admin'); 
    if(isAdmin){
      return true;
    }
    
    else return false;
     
       
    } catch (error) {
      console.error('Error decoding token:', error);
      console.log('user')
      return false;
    }
  };
}



