import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
const logger = require('morgan');

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['log', 'fatal', 'error', 'warn', 'debug','verbose']
  });
  app.setGlobalPrefix('api/v1');
  app.use(logger('dev')); 

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
   