import * as dotenv from 'dotenv';
import { IJwtConfig } from 'src/interfaces/jwtConfig.interface';
dotenv.config();

export const JwtConfig:IJwtConfig = {
    JWTKEY: process.env.JWTKEY,
    TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION,
    BEARER: process.env.BEARER
}