import {expect, test} from "@playwright/test";
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

    test("Successful login @positive", async ({page}) => {
        await loginPage.login(process.env.BASE_USER, process.env.BASE_PASSWORD);

        await expect(page).toHaveURL(/inventory.html/);
    });

    test("Incorrect username @negative", async ({page}) => {
        await loginPage.login(invUser.userName, "secret_sauce");

        await expect(loginPage.errorText()).toHaveText(/Epic sadface: Username and password do not match any user in this service/);
    });

    test("Incorrect password @negative", async ({page}) => {
        await loginPage.login("standard_user", invUser.password);

        await expect(loginPage.errorText()).toHaveText(/Epic sadface: Username and password do not match any user in this service/);
    });

    test("Empty input fields @negative", async ({page}) => {
        await loginPage.login(" ", " ");

        await expect(loginPage.errorText()).toHaveText(/Epic sadface: Username is required/);
    });

    test("Empty password input field @negative", async ({page}) => {
        await loginPage.login("standard_user", " ");

        await expect(loginPage.errorText()).toHaveText(/Epic sadface: Password is required/);
    });

    test("Empty input fields @negative", async ({page}) => {
        await loginPage.login(" ", "secret_sauce");

        await expect(loginPage.errorText()).toHaveText(/Epic sadface: Username is required/);
    });

});