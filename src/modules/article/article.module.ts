import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { articleProviders } from './article.provider';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports:[CloudinaryModule],
  providers: [ArticleService,...articleProviders],
  controllers: [ArticleController]
})
export class ArticleModule {}
