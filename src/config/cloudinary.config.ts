import * as dotenv from 'dotenv';
import { ICloudinaryConfig } from 'src/interfaces/ICloudinaryConfig';
dotenv.config();
export const CloudinaryConfig:ICloudinaryConfig= {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
}