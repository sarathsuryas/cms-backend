import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtConfig } from 'src/config/jwt.config';

@Module({
  imports:[
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: JwtConfig.JWTKEY,
      signOptions: { expiresIn: JwtConfig.TOKEN_EXPIRATION },
  }),
  ],
  providers: [AuthService,LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
