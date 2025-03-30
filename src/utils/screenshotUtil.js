import puppeteer from 'puppeteer';

export default async function captureScreenshot(
  url,
  { device = 'desktop', format = 'png' } = {}
) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(url, { waitUntil: 'networkidle2' });

  const screenshot = await page.screenshot({ fullPage: true, type: format });
  await browser.close();
  return screenshot;
}
