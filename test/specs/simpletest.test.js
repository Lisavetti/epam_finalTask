import pino from 'pino';

const log = pino();

const testCases = [
    {
        description: "UC-1 Test Login form with empty credentials",
        username: 'test_username',
        password: 'test_password',
        clearUsername: true,
        clearPassword: true,
        expectedError: "Username is required"
    },
    {
        description: "UC-2 Test Login form with credentials by passing Username",
        username: 'test_username',
        password: 'test_password',
        clearPassword: true,
        expectedError: "Password is required"
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
        await browser.url('https://www.saucedemo.com/');
    });

    testCases.forEach(({ description, username, password, clearUsername, clearPassword, expectedError, randomize, expectedTitle }) => {
        it(description, async () => {
            if (randomize) {
                const username_variants = await $('[data-test="login-credentials"]').getText();
                const usernames = username_variants
                    .split('\n')
                    .slice(1)
                    .map(username => username.trim());
                username = getRandomUsername(usernames);

                const password_variants = await $('[data-test="login-password"]').getText();
                password = password_variants.split(':')[1].trim();
            }

            await $('[data-test="username"]').setValue(username);
            await $('[data-test="password"]').setValue(password);

            if (clearUsername) {
                await $('[data-test="username"]').clearValue();
            }
            if (clearPassword) {
                await $('[data-test="password"]').clearValue();
            }

            await $('[data-test="login-button"]').click();

            if (expectedError) {
                await $('[data-test="error"]').waitForDisplayed();
                const errMes = await $('[data-test="error"]').getText();
                expect(errMes).toHaveText(expectedError);
            }

            if (expectedTitle) {
                await $('.app_logo').waitForDisplayed();
                const newMes = await $('.app_logo').getText();
                expect(newMes).toHaveText(expectedTitle);
            }
        });
    });

    after(async () => {
        log.info('All tests completed.');
    });

    function getRandomUsername(usernames) {
        const randomIndex = Math.floor(Math.random() * usernames.length);
        return usernames[randomIndex];
    }
});
