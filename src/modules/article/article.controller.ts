import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ICustomRequest } from 'src/interfaces/ICustomRequest';
import { ArticleDto } from './dto/article.dto';
import { Response } from 'express';

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) { }
    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File, @Req() req: ICustomRequest, @Res() res: Response) {
        try {
            const data = await this.articleService.cloudinaryService.uploadImage(file)
            const value: ArticleDto = JSON.parse(req.body.dto)
            const obj: ArticleDto = {
                content: value.content,
                description: value.description,
                published: value.published,
                title: value.title,
                thumbNailLink: data.secure_url,
                userId: req.user.id
            }
            const database = await this.articleService.create(obj)
            return res.status(HttpStatus.OK).json(database)
        } catch (error) {
            console.error(error)
        }
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('get-articles')
    async getArticles(@Req() req: ICustomRequest, @Res() res: Response) {
        try {
            const data = await this.articleService.findAll()
            res.status(HttpStatus.OK).json(data)
        } catch (error) {
            console.error(error)
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('view-article')
    async viewArticle(@Req() req: ICustomRequest, @Res() res: Response) {
        try {
            const id = req.query.articleId
            const data = await this.articleService.findOne(parseInt(id as string))
            console.log(data)
            res.status(HttpStatus.OK).json(data)
        } catch (error) {
            console.error(error)
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('get-individual-articles')
    async getIndividualArticles(@Req() req: ICustomRequest, @Res() res: Response) {
        try {
            const data = await this.articleService.findByUserId(req.user.id)
            res.status(HttpStatus.OK).json(data)
        } catch (error) {
            console.error(error)
        }
    }
    @UseGuards(AuthGuard('jwt'))
    @Patch('edit-article')
    async editArticle(@Req() req:ICustomRequest,@Res() res:Response) {
        try {
            const data = await this.articleService.update(req.body)
            const article = await this.articleService.findOne(parseInt(req.body.articleId as string))
            res.status(HttpStatus.OK).json(article)
        } catch (error) {
         console.error(error) 
        }
    }


  @Delete(':id') // Endpoint to delete an article
  async deleteArticle(@Param('id') id: string): Promise<void> {
    const articleId = parseInt(id, 10); // Convert id to a number
    if (isNaN(articleId)) {
      throw new HttpException('Invalid article ID', HttpStatus.BAD_REQUEST);
    }

    const isDeleted = await this.articleService.deleteArticleById(articleId);
    if (!isDeleted) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    return;
  }

}

