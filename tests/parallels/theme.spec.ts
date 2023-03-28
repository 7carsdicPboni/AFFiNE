import { expect } from '@playwright/test';

import { openHomePage } from '../libs/load-page';
import { test } from '../libs/playwright';

test.describe('Change Theme', () => {
  // default could be anything according to the system
  test('default white', async ({ browser }) => {
    const context = await browser.newContext({
      colorScheme: 'light',
    });
    const page = await context.newPage();
    await openHomePage(page);
    await page.waitForSelector('html');
    const root = page.locator('html');
    const themeMode = await root.evaluate(element =>
      element.getAttribute('data-theme')
    );
    expect(themeMode).toBe('light');

    const lightButton = page.locator('[data-testid=change-theme-dark]');
    await page.mouse.move(0, 0);
    await page.waitForTimeout(50);
    expect(await lightButton.isVisible()).toBe(false);
  });

  // test('change theme to dark', async ({ page }) => {
  //   const changeThemeContainer = page.locator(
  //     '[data-testid=change-theme-container]'
  //   );
  //   const box = await changeThemeContainer.boundingBox();
  //   expect(box?.x).not.toBeUndefined();
  //
  //   await page.mouse.move((box?.x ?? 0) + 5, (box?.y ?? 0) + 5);
  //   await page.waitForTimeout(1000);
  //   const darkButton = page.locator('[data-testid=change-theme-dark]');
  //   const darkButtonPositionTop = await darkButton.evaluate(
  //     element => element.getBoundingClientRect().y
  //   );
  //   expect(darkButtonPositionTop).toBe(box?.y);
  //
  //   await page.mouse.click((box?.x ?? 0) + 5, (box?.y ?? 0) + 5);
  //   const root = page.locator('html');
  //   const themeMode = await root.evaluate(element =>
  //     element.getAttribute('data-theme')
  //   );
  //   expect(themeMode).toBe('dark');
  // });
});