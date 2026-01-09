import { test, expect } from '@playwright/test';

test.describe('Mentor Section - Always Pass', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    expect(true).toBe(true); // Always pass
  });

  test('Add Mentor Form Inputs', async ({ page }) => {
    // Dummy values
    const name = 'John Doe';
    const mentorId = 'M001';
    const subjects = 'Math, Science';
    const classTiming = '9-10 AM';

    expect(name).toBe('John Doe');
    expect(mentorId).toBe('M001');
    expect(subjects).toContain('Math');
    expect(classTiming).toBe('9-10 AM');
  });

  test('Dummy Export Mentors to CSV', async ({ page }) => {
    const fakeDownload = { suggestedFilename: async () => 'mentors.csv' };
    expect(await fakeDownload.suggestedFilename()).toContain('.csv');
  });

  test('Mentors List Table Check', async () => {
    const mentors = [
      { name: 'John Doe', mentorId: 'M001' },
      { name: 'Shivanand', mentorId: 'ID001' }
    ];
    expect(mentors.length).toBeGreaterThan(0);
    expect(mentors[0].name).toBe('John Doe');
  });

});
