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
  await p.locator('.mrow:has-text("Anthropic")').first().click(); await p.waitForTimeout(800);
  const names = async () => (await p.locator('.mscroll .mrow .name').allTextContents());
  console.log(tag, 'default   ', (await names()).join(' | '));
  await p.locator('.fsort').click(); await p.waitForTimeout(500);
  const menu = await p.locator('.sortmenu').count();
  console.log(tag, 'menu open?', menu, await p.locator('.sortmenu .sortrow').allTextContents());
  if (menu) {
    await p.locator('.sortmenu .sortrow', { hasText: 'A' }).first().click();
    await p.waitForTimeout(600);
    console.log(tag, 'after A→Z ', (await names()).join(' | '));
  }
  await p.screenshot({ path:`s-${tag}.png` });
  await p.close();
}
await b.close();
