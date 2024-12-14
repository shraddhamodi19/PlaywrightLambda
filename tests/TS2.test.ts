import { test, expect, chromium } from "@playwright/test";

const getCapabilities = (platform: string, browserName: string) => ({
    browserName: browserName,
    browserVersion: "latest",
    "LT:Options": {
        platform: platform,
        build: "Playwright Parallel Build TSG2",
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
        test(`${platform} - ${browser}: Validate Drag & Drop Sliders`, async () => {
            const capabilities = getCapabilities(platform, browser);

            // Connect to LambdaTest
            const browserInstance = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
            );
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
            }
            });
