import { USER_REPOSITORY } from 'src/constants';
import { User } from './user.entity';

export const usersProviders = [{
    provide: USER_REPOSITORY,
    useValue: User,
}];