export default class LoginPage {
    get usernameInput() { return $('[data-test="username"]'); }
    get passwordInput() { return $('[data-test="password"]'); }
    get loginButton() { return $('[data-test="login-button"]'); }
    get errorMessage() { return $('[data-test="error"]'); }
    get logo() { return $('.app_logo'); }

    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }

    async clearUsername() {
        await this.usernameInput.clearValue();
    }

    async clearPassword() {
        await this.passwordInput.clearValue();
    }

    async waitForLogo(timeout = 20000) {
        await this.logo.waitForDisplayed({ timeout });
    }

    async getUsernameVariants() {
        const usernameVariants = await $('[data-test="login-credentials"]').getText();
        return usernameVariants
            .split('\n')
            .slice(1)
            .map(username => username.trim());
    }

    async getPasswordVariant() {
        const passwordVariant = await $('[data-test="login-password"]').getText();
        return passwordVariant.split(':')[1].trim();
    }

    async getErrorMessage() {
        await this.errorMessage.waitForDisplayed();
        return await this.errorMessage.getText();
    }
}
