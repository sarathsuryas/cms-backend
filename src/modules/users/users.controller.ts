import { Controller, Get, HttpStatus, InternalServerErrorException, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response} from 'express';
import { UsersService } from './users.service';
import { console } from 'inspector';
import { ICustomRequest } from 'src/interfaces/ICustomRequest';

@Controller('user')
export class UsersController {
   constructor(private _usersService:UsersService) {}

   @Get('get-user-data')
   async getUserData(@Req() req:ICustomRequest,@Res() res:Response) {
      try {
         const userData = await this._usersService.findOneById(req.user.id)
         res.status(HttpStatus.OK).json({message:"sdfsdfsdfsfdsdfdsffsd"})
      } catch (error) {
         console.error(error)
        throw new InternalServerErrorException()
         
      }
   }
}
