import {Page} from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public open() {
        return this.page.goto("/");
    }

    get loginInput() {
        return this.page.locator("#user-name");
    }

    get passwordInput() {
        return this.page.locator("#password");
    }

    get submit() {
        return this.page.locator("#login-button");
    }

    get errorContainer() {
        return this.page.locator("#error-message-container");
    }

    get errorIcon() {
        return this.page.locator("#error-icon");
    }

    get errorText() {
        return this.page.locator("#h3[data-test=\"error\"]");
    }

    public async fillUserName(userName: string) {
        await this.loginInput.clear();
        await this.loginInput.fill(userName);
        await this.loginInput.blur();
    }

    public async fillPassword(password: string) {
        await this.loginInput.clear();
        await this.loginInput.fill(password);
        await this.loginInput.blur();
    }

    public async login(userName: string, password: string) {
        await this.open();
        await this.fillUserName(userName);
        await this.fillPassword(password);
        await this.submit.click();
    }
}
