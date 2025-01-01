import { v2 } from 'cloudinary';
import { CloudinaryConfig } from 'src/config/cloudinary.config';
import { CLOUDINARY } from 'src/constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: CloudinaryConfig.cloud_name,
      api_key: CloudinaryConfig.api_key,
      api_secret: CloudinaryConfig.api_secret,
    });
  },
};