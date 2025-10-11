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

}
