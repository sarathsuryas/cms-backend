import { ARTICLE_REPOSITORY } from "src/constants";
import { Article } from "./article.entity";

export const articleProviders = [{
    provide: ARTICLE_REPOSITORY,
    useValue: Article,
}];