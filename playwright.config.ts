import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    projects: [
        {
            name: "Windows 10 - Chromium",
            use: {
                connectOptions: {
                    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
                        browserName: "Chrome",
                        browserVersion: "latest",
                        "LT:Options": {
                            platform: "Windows 10",
                            build: "Playwright Parallel Build",
                            name: "Windows 10 - Chromium Test",
                            user: 'shraddha_modi',
                            accessKey: 'HH0R4XIShfwSZwcf1B5az3zPH2lW1LYjZ0k4xgQ3yLbQJJ0Lar',
                            network: true,
                            video: true,
                            console: true,
                            tunnel: false,
                        }
                    }))}`
                },
                viewport: { width: 1920, height: 1080 },
            },
        },
        {
            name: "macOS Catalina - Chromium",
            use: {
                connectOptions: {
                    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
                        browserName: "Chrome",
                        browserVersion: "latest",
                        "LT:Options": {
                            platform: "MacOS Catalina",
                            build: "Playwright Parallel Build",
                            name: "macOS Catalina - Chromium Test",
                            user: 'shraddha_modi',
                            accessKey: 'HH0R4XIShfwSZwcf1B5az3zPH2lW1LYjZ0k4xgQ3yLbQJJ0Lar',
                            network: true,
                            video: true,
                            console: true,
                            tunnel: false,
                        }
                    }))}`
                },
                viewport: { width: 1920, height: 1080 },
            },
        },
    ],

    testMatch: ["tests/TS3.test.ts"],
    use: {
        baseURL: "https://www.lambdatest.com/selenium-playground/",
        headless: false,
        screenshot: "on",
        video: "on",
    },
    timeout: 60 * 1000 * 5,
    retries: 0,
    reporter: [
        ["dot"],
        ["json", { outputFile: "jsonReports/jsonReport.json" }],
        ["html", { open: "never" }],
    ],
};

export default config;
