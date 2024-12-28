import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response} from 'express';

@Controller('users')
export class UsersController {
   @Get()
   async test(@Req() req:Request, @Res() res:Response) {
    res.status(200).json({message:"hey man"})
   }
}
