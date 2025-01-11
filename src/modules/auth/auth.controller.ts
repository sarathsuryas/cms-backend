import { Body, Controller, InternalServerErrorException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { DoesUserExist } from 'src/core/doesUserExist.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req) {
        try {    
          return await this.authService.login(req.user);
        } catch (error) {
         console.error(error)
         throw new InternalServerErrorException()
        }
    }
    @UseGuards(DoesUserExist)
    @Post('register')
    async signUp(@Body() user: UserDto) {
        try {
            return await this.authService.create(user);   
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException()

        }
        
    }
}
