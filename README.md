# WebDriverIO SauceDemo Login Tests

## Task Description

This project involves automating tests for the login functionality of the SauceDemo website using WebDriverIO. The tests cover various use cases, such as login with empty credentials, login with only a username, and login with both username and password. The tests are designed to validate the expected behavior of the login form and ensure that the appropriate error messages or success states are displayed.

### Test Cases Implemented

1. **UC-1: Test Login Form with Empty Credentials**
   - **Description:** Tests the login form by attempting to submit it with both the username and password fields cleared.
   - **Expected Result:** An error message "Username is required" should be displayed.

2. **UC-2: Test Login Form with Only Username**
   - **Description:** Tests the login form by submitting it with a username but without a password.
   - **Expected Result:** An error message "Password is required" should be displayed.

3. **UC-3: Test Login Form with Both Username and Password**
   - **Description:** Tests the login form by submitting it with both a valid username and password. The test randomizes the username based on available credentials on the page.
   - **Expected Result:** The user should successfully log in, and the page title should be "Swag Labs".

### Project Structure

- **Test Code:** The tests are implemented using WebDriverIO and are organized in a single file. Each test case is defined with a description, credentials, and expected outcomes.
- **Logging:** The `pino` logger is used to log the start and end of the test suite.

### How to Run the Tests

1. **Clone this repository**:
   ```bash
   https://github.com/Lisavetti/epam_finalTask.git
   cd saucedemo-login-tests
   
2. **Install the necessary dependencies**:
Ensure you have Node.js and npm installed. Then, run:
    ```bash
    npm install

3. **Run the tests**:
To run the tests, use the WebDriverIO command:
   ```bash
   npx wdio wdio.conf.js


## Configuration
The tests are configured to run on both Chrome and Microsoft Edge. If you encounter issues with the browsers, ensure that the paths to the browser binaries are correctly set in the wdio.conf.js file.

## Known Issues
Chrome Binary Not Found: After installing Microsoft Edge, you might encounter an issue where the Chrome binary cannot be found. This can be resolved by explicitly setting the path to the Chrome binary in the WebDriverIO configuration or by updating your system's PATH environment variable.

## Additional Notes
The login credentials used for the tests are dynamically fetched from the SauceDemo page, allowing for flexibility and randomness in test execution.
