import { test, expect, chromium } from "@playwright/test";

const getCapabilities = (platform: string, browserName: string, buildName: string) => ({
    browserName: browserName,
    browserVersion: "latest",
    "LT:Options": {
        platform: platform,
        build: "Playwright Parallel Build",
        name: `${platform} - ${browserName} Test`,
        user: "shraddha_modi",
        accessKey: "HH0R4XIShfwSZwcf1B5az3zPH2lW1LYjZ0k4xgQ3yLbQJJ0Lar",
        network: true,
        video: true,
        console: true,
        tunnel: false,
    },
});

test.describe.parallel("Cross-platform Parallel Tests", () => {
    const platforms = [
        { platform: "Windows 10", browser: "Chrome" },
        { platform: "macOS Catalina", browser: "Chrome" },
    ];

    for (const { platform, browser } of platforms) {

        // Test 1: Validate Simple Form Demo
        test(`${platform} - ${browser}: Validate Simple Form Demo`, async () => {
            const capabilities = getCapabilities(platform, browser, "Playwright Parallel Build TSG1");

            // Connect to LambdaTest
            const browserInstance = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`);
            const context = await browserInstance.newContext();
            const page = await context.newPage();

            // Navigate to the Selenium Playground
            await page.goto("https://www.lambdatest.com/selenium-playground");

            // Click on "Simple Form Demo"
            await page.click("'Simple Form Demo'");
            await expect(page).toHaveURL(/simple-form-demo/);

            // Validate the URL contains "simple-form-demo"
            const url = page.url();
            expect(url).toContain("simple-form-demo");

            // Input message and validate
            const inputMessage = "Welcome to LambdaTest";
            await page.fill("input#user-message", inputMessage);
            await page.click("#showInput");

            // Validate the displayed message
            const displayedMessage = await page.textContent("#message");
            expect(displayedMessage.trim()).toBe(inputMessage);

            // Clean up
            await page.close();
            await context.close();
            await browserInstance.close();
        });

        // Test 2: Validate Drag & Drop Sliders
        test(`${platform} - ${browser}: Validate Drag & Drop Sliders`, async () => {
            const capabilities = getCapabilities(platform, browser, "Playwright Parallel Build TS2");

            // Connect to LambdaTest
            const browserInstance = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`);
            const context = await browserInstance.newContext();
            const page = await context.newPage();

            // Navigate to the Selenium Playground
            await page.goto("https://www.lambdatest.com/selenium-playground");

            // Click on "Drag & Drop Sliders"
            await page.locator('xpath=//*[@id="__next"]/div/section[2]/div/ul/li[13]/a').click();
    
            // Locate the slider and perform the drag action
            const slider = page.locator('xpath=//*[@id="slider3"]/div/input');
            const boundingBox = await slider.boundingBox();
            if (boundingBox) {
                await page.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
                await page.mouse.down();
                await page.mouse.move(boundingBox.x + boundingBox.width / 2 + 215, boundingBox.y + boundingBox.height / 2);
                await page.mouse.up();
            }

            // Validate the slider value
            const actualValue = await page.locator('xpath=//*[@id="rangeSuccess"]').textContent();
            expect(actualValue.trim()).toBe("95");

            // Clean up
            await page.close();
            await context.close();
            await browserInstance.close();
        });

        // Test 3: Validate Input Form Submit
        test(`${platform} - ${browser}: Validate Input Form Submit`, async () => {
            const capabilities = getCapabilities(platform, browser, "Playwright Parallel Build TS3");

            // Connect to LambdaTest
            const browserInstance = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`);
            const context = await browserInstance.newContext();
            const page = await context.newPage();

            // Navigate to the Selenium Playground
            await page.goto("https://www.lambdatest.com/selenium-playground");

            // Click on "Input Form Submit"
            await page.click("text=Input Form Submit");
            await expect(page).toHaveURL(/input-form-demo/);

            // Fill in the form fields
            await page.fill("#name", "Shraddha Modi");
            await page.fill("#inputEmail4", "shraddha_modi@persistent.com");
            await page.fill("#inputPassword4", "Password123");
            await page.fill("#company", "Persistent");
            await page.fill("#websitename", "https://www.persistent.com");

            // Select "United States" from Country dropdown
            const countryDropdown = await page.locator('select[name="country"]');
            await countryDropdown.selectOption({ label: 'United States' });

            // Fill remaining fields
            await page.fill("#inputCity", "New York");
            await page.fill("#inputAddress1", "A1");
            await page.fill("#inputAddress2", "A2");
            await page.fill("#inputState", "NY");
            await page.fill("#inputZip", "123456");

            // Submit the form
            await page.click("//button[text()='Submit']");

            // Validate success message
            const text = await page.textContent('xpath=//*[@id="__next"]/div/section[2]/div/div/div/div/p');
            if (text === "Thanks for contacting us, we will get back to you shortly.") {
                expect(text).toBe("Thanks for contacting us, we will get back to you shortly.");
            }

            // Clean up
            await page.close();
            await context.close();
            await browserInstance.close();
        });
    }
});
