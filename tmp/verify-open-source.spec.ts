import { expect, test } from 'playwright/test';

test('capture open source section', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1400 });
  await page.goto('http://127.0.0.1:3001');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);

  const section = page.locator('section').filter({ hasText: 'Code in the repos you use.' }).first();

  await expect(section).toBeVisible();
  await section.screenshot({ path: '/tmp/open-source-section-after-fix.png' });
});
