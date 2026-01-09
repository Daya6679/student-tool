import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Folder where tests are located
  testDir: './tests',

  // Global timeout for a single test
  timeout: 60 * 1000, // 60 seconds

  // Expect assertion timeout
  expect: {
    timeout: 10 * 1000,
  },

  // Run tests in parallel
  fullyParallel: true,

  // 🔑 Workers:
  // - Local run: Playwright decides automatically
  // - CI (Jenkins): limit to 2 workers for stability
  workers: process.env.CI ? 2 : undefined,

  // Fail build if test.only is committed
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  retries: process.env.CI ? 1 : 0,

  // Test reporter
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  // Shared settings for all tests
  use: {
    // Run in headless mode in CI
    headless: true,

    // Base URL of your app
    // Change this if your app runs on a different port
    baseURL: 'http://localhost:3000',

    // Collect trace only on failure
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Improve stability in Jenkins
    launchOptions: {
      args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
      ],
    },
  },

  // Browser projects
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment if you want more browsers later
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],

  // Output directory
  outputDir: 'test-results',
});
