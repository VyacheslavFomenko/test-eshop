import {expect} from "@playwright/test";
import {test} from "../fixtures/login-fixtures"
import {LoginPage} from "../pages/LoginPage";
import {generateInvalidUser, User} from "../helpers/dataGenerator";

test.describe("Login page flow", async () => {
    let loginPage: LoginPage;
    let invUser: User;
    test.beforeEach(async ({page}) => {
        invUser = generateInvalidUser();
        loginPage = new LoginPage(page);
        await loginPage.open();
    });
    test("Successful login @positive", async ({page, loginUser}) => {
        await expect(page).toHaveURL(/inventory.html/);
    });

    [
        {userName: invUser.userName, password: "secret_sauce", errMessage: /Epic sadface: Username and password do not match any user in this service/},
        {userName: "standard_user", password: invUser.password, errMessage: /Epic sadface: Username and password do not match any user in this service/},
        {userName: " ", password: " ", errMessage: /Epic sadface: Username is required/},
        {userName: "standard_user", password: " ", errMessage: /Epic sadface: Password is required/},
        {userName: " ", password: "secret_sauce", errMessage: /Epic sadface: Username is required/}

    ].forEach(({userName, password,errMessage}) => {
        test("Incorrect username @negative", async ({page}) => {
            await loginPage.login(userName, password);

            await expect(loginPage.errorText()).toHaveText(errMessage);
        });
    });
});