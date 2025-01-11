export interface IEditArticle {
        articleId: number;
        data: { title: string, description: string, content:string };
        thumbNailLink:string;
}