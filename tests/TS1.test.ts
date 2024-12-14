import { test, expect, chromium } from "@playwright/test";

const getCapabilities = (platform: string, browserName: string) => ({
    browserName: browserName,
    browserVersion: "latest",
    "LT:Options": {
        platform: platform,
        build: "Playwright Parallel Build TSG1",
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
        test(`${platform} - ${browser}: Validate Simple Form Demo`, async () => {
            const capabilities = getCapabilities(platform, browser);

            // Connect to LambdaTest
            const browserInstance = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
            );
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
    }
});

