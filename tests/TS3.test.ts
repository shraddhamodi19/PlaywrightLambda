import { test, expect, chromium } from "@playwright/test";

const getCapabilities = (platform: string, browserName: string) => ({
    browserName: browserName,
    browserVersion: "latest",
    "LT:Options": {
        platform: platform,
        build: "Playwright Parallel Build TSG3",
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

            // Click on "Input Form Submit"
            await page.click("text=Input Form Submit");
            await expect(page).toHaveURL(/input-form-demo/);

            // Click "Submit" without filling any information
            // page.on("dialog", async (alert) => {
            //     const text = alert.message();
            //     console.log(text);
            //     await alert.dismiss();
            // })
            
            await page.click("//button[text()='Submit']");
            const message = await page.locator('//*[@id="seleniumform"]/div[6]/button').getAttribute('validationMessage');
            let status = false;
            if (message === "Please fill in the fields") {
             status = true;
            }
            // const errorMessage = await page.textContent(".form-error-message");
            // expect(errorMessage.trim()).toBe("Please fill in the fields");

            // Assert error message "Please fill in the fields"
            //const errorMessage = await page.textContent("div[role='alert']");
            // expect(errorMessage).toContain("Please fill in the fields");
            //const errorMessage = await page.textContent(".error-message");
            //expect(errorMessage.trim()).toBe("Please fill in the fields");

            // await page.waitForSelector(".error-message", { state: "visible" });
            // const errorMessage = await page.locator(".error-message").textContent();
            // const trimmedMessage = errorMessage.split("!")[0].trim();
            // expect(trimmedMessage).toBe("Please fill in the fields");



            // Fill in the form fields
            await page.fill("#name", "Shraddha Modi");
            await page.fill("#inputEmail4", "shraddha_modi@persistent.com");
            await page.fill("#inputPassword4", "Password123");
            await page.fill("#company", "Persistent");
            await page.fill("#websitename", "https://www.persistent.com");

            // Select "India" from Country dropdown
            const countryDropdown = await page.locator('select[name="country"]');
            await countryDropdown.selectOption({ label: 'United States' });
            // await page.selectOption("#country", { label: "United States" });

            // Fill remaining fields
            await page.fill("#inputCity", "New York");
            await page.fill("#inputAddress1", "A1");
            await page.fill("#inputAddress2", "A2");
            await page.fill("#inputState", "NY");
            await page.fill("#inputZip", "123456");

            // Submit the form
            await page.click("//button[text()='Submit']");

            // Validate success message
            //async function verifyText(page) {
                const text = await page.textContent('xpath=//*[@id="__next"]/div/section[2]/div/div/div/div/p');
                if (text === "Thanks for contacting us, we will get back to you shortly.") {
                  status = true;
                }
            
            
            // const successMessage = await page.textContent("div[role='alert']");
            // expect(successMessage).toContain("Thanks for contacting us, we will get back to you shortly.");

            // Clean up
            await page.close();
            await context.close();
            await browserInstance.close();
        });
    }
});
