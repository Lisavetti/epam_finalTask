import LoginPage from '../../pageobjects/LoginPage.page.js';
import { getRandomUsername } from '../../utils/utils.js';
import pino from 'pino';

const log = pino();
const loginPage = new LoginPage();

const testCases = [
    {
        description: "UC-1 Test Login form with empty credentials",
        username: 'test_username',
        password: 'test_password',
        clearUsername: true,
        clearPassword: true,
        expectedError: "Epic sadface: Username is required" // Updated to match actual text
    },
    {
        description: "UC-2 Test Login form with credentials by passing Username",
        username: 'test_username',
        password: 'test_password',
        clearPassword: true,
        expectedError: "Epic sadface: Password is required" // Updated to match actual text
    },
    {
        description: "UC-3 Test Login form with credentials by passing Username & Password",
        randomize: true,
        expectedTitle: "Swag Labs"
    }
];

describe("Saucedemo login page", () => {

    before(async () => {
        log.info('Starting SauceDemo login tests...');
    });

    beforeEach(async () => {
        await browser.url('/');
    });

    testCases.forEach(({ description, username, password, clearUsername, clearPassword, expectedError, randomize, expectedTitle }) => {
        it(description, async () => {
            if (randomize) {
                const usernames = await loginPage.getUsernameVariants();
                username = getRandomUsername(usernames);
                password = await loginPage.getPasswordVariant();
            }


            if (clearUsername) {
                await loginPage.clearUsername();
            }
            if (clearPassword) {
                await loginPage.clearPassword();
            }

            await loginPage.login(username, password);

            if (expectedError) {
                const errMes = await loginPage.getErrorMessage();
                expect(errMes).toHaveText(expectedError);
            }

            if (expectedTitle) {
                await loginPage.waitForLogo(20000);  // 20 seconds timeout
                const logoText = await loginPage.logo.getText();
                expect(logoText).toHaveText(expectedTitle);
            }
        });
    });

    after(async () => {
        log.info('All tests completed.');
    });
});
