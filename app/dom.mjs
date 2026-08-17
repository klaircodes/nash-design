import pkg from '/Users/clairesarcia/node_modules/playwright/index.js';
const { chromium } = pkg;
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:1000}, deviceScaleFactor:1 });
await p.goto('http://localhost:5173',{waitUntil:'networkidle'});
const g = p.locator('button:has-text("Google")').first(); if (await g.count()) await g.click();
await p.waitForTimeout(1100);
console.log(await p.evaluate(() => {
  const row = [...document.querySelectorAll('.chatrow')].find(e => e.textContent.includes('Pricing research'));
  const out = []; let n = row.parentElement;
  for (let i = 0; i < 3 && n; i++, n = n.parentElement) {
    const c = getComputedStyle(n);
    out.push(`${n.className || n.tagName} display:${c.display} gap:${c.gap} kids:${n.children.length}`);
  }
  return out;
}));
await b.close();
