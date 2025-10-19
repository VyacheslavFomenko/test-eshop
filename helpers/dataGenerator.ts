import {faker} from '@faker-js/faker';

export interface User {
    userName: string;
    password: string;
}

export const generateInvalidUser = (): User => ({
    userName: faker.internet.username(),
    password: faker.internet.password(),
});
