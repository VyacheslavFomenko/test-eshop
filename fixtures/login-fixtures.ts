import {test as base} from '@playwright/test';
import {User} from "../helpers/dataGenerator";
import {LoginPage} from "../pages/LoginPage";

export const test = base.extend<{ loginUser: User }>({
    loginUser: async ({page}, use) => {
        const user = {
            userName: process.env.BASE_USER,
            password: process.env.BASE_PASSWORD
        }
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(user.userName, user.password);
        await use(user);
    }
});