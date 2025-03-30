import puppeteer from 'puppeteer';

export async function captureScreenshot(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

  const screenshot = await page.screenshot({ fullPage: true });
  await browser.close();

  return screenshot;
}
