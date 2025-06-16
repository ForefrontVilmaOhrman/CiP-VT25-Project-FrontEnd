import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directory where tests are located
  timeout: 60000, // Timeout for each test
  retries: 0, // Number of retries for failed tests
  use: {
    headless: false, // Run tests in headless mode
    launchOptions: {
      slowMo: 2000, // Add a 2-second delay between actions
    },
  },
});
