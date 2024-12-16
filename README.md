## Features
- **Cross-platform Testing:** Runs tests on Windows 10 and macOS Catalina.
- **Parallel Execution:** Executes tests simultaneously across different platforms.

- **Automated Test Scenarios:**
**Test Scenario 1**:-
1. Open LambdaTest’s Selenium Playground from
https://www.lambdatest.com/selenium-playground
2. Click “Simple Form Demo”.
3. Validate that the URL contains “simple-form-demo”.
4. Create a variable for a string value e.g.: “Welcome to LambdaTest”.
5. Use this variable to enter values in the “Enter Message” text box.
6. Click “Get Checked Value”.
7. Validate whether the same text message is displayed in the right-hand
panel under the “Your Message:” section.

**Test Scenario 2**:-
1. Open the https://www.lambdatest.com/selenium-playground page and
click “Drag & Drop Sliders”.
2. Select the slider “Default value 15” and drag the bar to make it 95 by
validating whether the range value shows 95.

**Test Scenario 3**:-
1. Open the https://www.lambdatest.com/selenium-playground page and
click “Input Form Submit”.
2. Click “Submit” without filling in any information in the form.
3. Assert “Please fill in the fields” error message.
4. Fill in Name, Email, and other fields.
5. From the Country drop-down, select “United States” using the text
property.
6. Fill in all fields and click “Submit”.
7. Once submitted, validate the success message “Thanks for contacting
us, we will get back to you shortly.” on the screen.


## Prerequisites
- [Node.js](https://nodejs.org/) installed on your system.
- A LambdaTest account with access credentials (username and access key).
- Install Playwright extension and install playwright for browser

## Project Structure
- `playwright.config.ts`: Configuration file for Playwright, including project setup, browser settings, and test match patterns.
- `tests/TS.test.ts`: Contains the test cases for different scenarios.

  
## Running the Tests
To execute the tests, use the following command:
```bash
npx playwright test
```

## Configuration Highlights
- **Base URL**: `https://www.lambdatest.com/selenium-playground/`
- **Browser Settings**: Chrome (latest version) with 1920x1080 viewport.

