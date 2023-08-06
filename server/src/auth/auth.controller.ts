import { Body, Controller, Post, Get, HttpCode, HttpStatus, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './decorator/public.decorator';
import { Response } from 'express';


@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { password: string, _id: string }, @Res({ passthrough: true }) res: Response) {
    let token = this.authService.signIn(signInDto.password, signInDto._id);
    return token;
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('decode')
  async decode(@Body() token) {

    const tokenValue = token.access_token;
    const flag = await this.authService.checkIfAdmin(tokenValue);
    return flag;
  }
}
