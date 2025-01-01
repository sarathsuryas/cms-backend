import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidateInputPipe } from './core/validate.pipe';
const logger = require('morgan');

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['log', 'fatal', 'error', 'warn', 'debug','verbose'],
    cors:true
  });
  app.setGlobalPrefix('api/v1');
  app.use(logger('dev')); 
  app.enableCors({
    origin: 'https://cms-frontend-6y8szivtr-sarathsuryasss48-gmailcoms-projects.vercel.app', // Allow requests from Angular's development server
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // HTTP methods allowed
    credentials: true, // Allow cookies to be sent
  });
  app.useGlobalPipes(new ValidateInputPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
   