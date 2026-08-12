import pkg from '/Users/clairesarcia/node_modules/playwright/index.js';
const { chromium } = pkg;
const b = await chromium.launch();
for (const [w,h,tag] of [[1440,900,'desktop'],[390,844,'mobile']]) {
  const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:2 });
  await p.goto('http://localhost:5173', { waitUntil:'networkidle' });
  const g = p.locator('button:has-text("Google")').first();
  if (await g.count()) await g.click();
  await p.waitForTimeout(1200);
  await p.locator('.modelpick').click(); await p.waitForTimeout(800);
  const rows = async () => (await p.locator('.mscroll .mrow').allTextContents()).map(t=>t.replace(/\s+/g,' ').trim());
  console.log(tag, 'ROOT default', JSON.stringify(await rows()));
  await p.locator('.fsort').click(); await p.waitForTimeout(400);
  await p.locator('.sortmenu .sortrow', { hasText: 'A' }).first().click();
  await p.waitForTimeout(600);
  console.log(tag, 'ROOT A→Z   ', JSON.stringify(await rows()));
  await p.close();
}
await b.close();
