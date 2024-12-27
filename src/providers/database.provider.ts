import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from 'src/config/database.config';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from 'src/constants';

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
        sequelize.authenticate().then(()=>console.log("Psql Connected"))
        .catch(()=>console.log('check db connection'))
        sequelize.addModels(['models goes here']);
        await sequelize.sync();
        return sequelize;
    },
}];