import { test, expect } from '@playwright/test';

test('Create Event', async ({ page }) => {
  // Navigate to the event creation page
  await page.goto('http://localhost:4200/events/create');

  // Wait for the page to load
  await page.waitForLoadState('domcontentloaded');

  // Use XPath for locating the title field
  const titleField = page.locator('//*[@id="title"]');

  // Fill out the title field
  await titleField.fill('Event Test');

  // Verify the text is written in the title field
  await expect(titleField).toHaveValue('Event Test');

  // Use XPath for locating the date field
  const dateField = page.locator('//*[@id="date"]');

  // Fill out the date field
  await dateField.fill('2025-06-10');

  // Verify the text is written in the date field
  await expect(dateField).toHaveValue('2025-06-10');

  // Use XPath for locating the arranger field
  const arrangerField = page.locator('xpath=/html/body/app-root/div/main/app-event-form/div/form/div/div/div[1]/app-event-info-card/div/div/div[2]/input');

  // Fill out the arranger field
  await arrangerField.fill('John Doe');

  // Verify the text is written in the arranger field
  await expect(arrangerField).toHaveValue('John Doe');

  // Use XPath for locating the description field
  const descriptionField = page.locator('xpath=/html/body/app-root/div/main/app-event-form/div/form/div/div/div[1]/app-event-info-card/div/textarea');

  // Fill out the description field
  await descriptionField.fill('This is a test description.');

  // Verify the text is written in the description field
  await expect(descriptionField).toHaveValue('This is a test description.');

  // Use CSS selector for locating the location field for Dancing
  const dancingField = page.locator('body > app-root > div > main > app-event-form > div > form > div > div > div:nth-child(1) > app-event-info-drop-down > div > div > div.flex.flex-col > input');

  // Fill out the location field for Dancing
  await dancingField.fill('Dancing');

  // Verify the text is written in the location field for Dancing
  await expect(dancingField).toHaveValue('Dancing');

  // Use CSS selector for locating the location field for Stockholm
  const stockholmField = page.locator('body > app-root > div > main > app-event-form > div > form > div > div > div:nth-child(2) > app-event-info-drop-down > div > div > div.flex.flex-col > input:nth-child(1)');

  // Fill out the location field for Stockholm
  await stockholmField.fill('Stockholm');

  // Verify the text is written in the location field for Stockholm
  await expect(stockholmField).toHaveValue('Stockholm');

  // Use CSS selector for locating the RSVP field
  const rsvpField = page.locator('body > app-root > div > main > app-event-form > div > form > div > div > div:nth-child(2) > app-event-info-card > div > textarea');

  // Fill out the RSVP field
  await rsvpField.fill('Please RSVP by June 1st.');

  // Verify the text is written in the RSVP field
  await expect(rsvpField).toHaveValue('Please RSVP by June 1st.');

  // Use CSS selector for locating the submit button
  const submitButton = page.locator('body > app-root > div > main > app-event-form > div > form > app-tool-bar > div > div > button');

  // Click on the submit button
  await submitButton.click();

  // Navigate to the events page
  await page.goto('http://localhost:4200/events');

  // Verify if "Event Test" exists on the page
  await expect(page.locator('text=Event Test')).toBeVisible();

  // Locate the container for "Event Test" uniquely
  const eventContainer = page.locator('div.relative:has(h6:has-text("Event Test"))');

  // Locate the "Read more" button within the container
  const readMoreButton = eventContainer.locator('button:has-text("Read more")');

  // Click on the "Read more" button
  await readMoreButton.click();

  // Locate the delete button using the provided CSS selector
  const deleteButton = page.locator('body > app-root > div > main > app-event-form > div > form > app-tool-bar > div > div > button:nth-child(2)');

  // Handle confirmation dialog when clicking the delete button
  page.on('dialog', async (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`); // Log the dialog message for debugging
    await dialog.accept(); // Accept the dialog to confirm deletion
  });

  // Click on the delete button
  await deleteButton.click();
});
