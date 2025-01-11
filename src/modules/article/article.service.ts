import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_REPOSITORY } from 'src/constants';
import { Article } from './article.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ArticleDto } from './dto/article.dto';
import { User } from '../users/user.entity';
import { IArticle } from 'src/interfaces/IArticle';
import { IEditArticle } from './dto/edit.dto';

@Injectable()
export class ArticleService {
    
    constructor(@Inject(ARTICLE_REPOSITORY) private readonly articleRepository: typeof Article, public cloudinaryService: CloudinaryService) { }
    async create(dto: ArticleDto) {
        try {
            const data = await this.articleRepository.create({
                userId: dto.userId,
                content: dto.content,
                thumbNailLink: dto.thumbNailLink,
                description: dto.description,
                published: dto.published,
                title: dto.title
            })
            return data
        } catch (error) {
            console.error(error)
        }
    }
    async findAll(page: number, limit: number) {
        try {
            const offset = (page - 1) * limit; 
            const data = await this.articleRepository.findAll({
                attributes: { exclude: ['content'] },
                offset: offset,
                limit: limit,
            });
    
            return data
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch articles.');
        }
    }
    

 async findOne(id:number): Promise<Article> {
    try {
        return await this.articleRepository.findOne({
            where: { id },
            include: [{ model: User, attributes: { exclude: ['password'] } }],
        });  
    } catch (error) {
        console.error(error)
    }
    
}
async findByUserId (id:number) {
  try {
    const data = await this.articleRepository.findAll({
        where: { userId:id }
      });    
      return data
  } catch (error) {
    console.error(error)
  }
}

async update(dto:IEditArticle) {
    try {
        if(dto.thumbNailLink) {
            console.log(dto.thumbNailLink)
          const data = await this.articleRepository.update(
             { title: dto.data.title, content: dto.data.content,description:dto.data.description,thumbNailLink:dto.thumbNailLink },
           { where: { id: dto.articleId } }      
          ) 
          return data
        } else {
            const data = await this.articleRepository.update(
                { title: dto.data.title, content: dto.data.content,description:dto.data.description },
              { where: { id: dto.articleId } }      
             ) 
             return data  
        }
    } catch (error) {
       console.error(error)  
    }
}

async deleteArticleById(articleId: number) {
    try {
        const data = await this.articleRepository.destroy(
            {where:{id:articleId}}
        ) 
        return data
    } catch (error) {
        console.error(error)
    }
}

}
