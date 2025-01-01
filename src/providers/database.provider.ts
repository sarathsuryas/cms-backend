import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from 'src/config/database.config';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from 'src/constants';
import { Article } from 'src/modules/article/article.entity';
import { User } from 'src/modules/users/user.entity';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
         
        const sequelize = new Sequelize(config);
        sequelize.authenticate().then(()=>console.log("Postgres Connected"))
        .catch(()=>console.log('check db connection'))
        sequelize.addModels([User,Article]);
        await sequelize.sync();
        return sequelize;
    },
}];