import { Body, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Param, Patch, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ICustomRequest } from 'src/interfaces/ICustomRequest';
import { ArticleDto } from './dto/article.dto';
import { Response } from 'express';
import { IEditArticle } from './dto/edit.dto';

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) { }
    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File, @Req() req: ICustomRequest, @Res() res: Response) {
        try {
            let data = null
            if (file) {
                data = await this.articleService.cloudinaryService.uploadImage(file)
            }
            const value: ArticleDto = JSON.parse(req.body.dto)
            const obj: ArticleDto = {
                content: value.content,
                description: value.description,
                published: value.published,
                title: value.title,
                thumbNailLink: data?.secure_url,
                userId: req.user.id
            }
            const database = await this.articleService.create(obj)
            return res.status(HttpStatus.OK).json(database)
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException()
        }
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('get-articles')
    async getArticles(
        @Req() req: ICustomRequest,
        @Res() res: Response, @Query('page') page: number,
        @Query('limit') limit: number) {
        try {
            page = Number(page) || 1;
            limit = Number(limit) || 6;
            
            const data = await this.articleService.findAll(page,limit)
            console.log(data.length,'/////////////////////////////')
            res.status(HttpStatus.OK).json(data)
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException()
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
            throw new InternalServerErrorException()
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
            throw new InternalServerErrorException()
        }
    }
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('thumbNail'))
    @Patch('edit-article')
    async editArticle(
        @Req() req: ICustomRequest,
        @UploadedFile() file: Express.Multer.File,
        @Res() res: Response) {
        try {
            const { articleId, title, description, content } = req.body;
            const thumbnailPath = file
            let thumbNailLink = ''
            if (thumbnailPath) {
                const cloudinary = await this.articleService.cloudinaryService.uploadImage(file)
                thumbNailLink = cloudinary.secure_url
            }
            console.log(thumbNailLink, '/////////////////////////////////////////')
            const obj: IEditArticle = {
                articleId: parseInt(articleId),
                data: {
                    title: title,
                    description: description,
                    content: content
                },
                thumbNailLink: thumbNailLink
            }
            const data = await this.articleService.update(obj)
            const article = await this.articleService.findOne(parseInt(req.body.articleId as string))
            res.status(HttpStatus.OK).json(article)
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException()
        }
    }


    @Delete(':id') // Endpoint to delete an article
    async deleteArticle(@Param('id') id: string): Promise<void> {
        try {
            const articleId = parseInt(id, 10); // Convert id to a number
            if (isNaN(articleId)) {
                throw new HttpException('Invalid article ID', HttpStatus.BAD_REQUEST);
            }
    
            const isDeleted = await this.articleService.deleteArticleById(articleId);
            if (!isDeleted) {
                throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
            }
    
            return;
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException()
  
        }
       
    }

}

