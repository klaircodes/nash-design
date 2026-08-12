import pkg from '/Users/clairesarcia/node_modules/playwright/index.js';
const { chromium } = pkg;
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:1000}, deviceScaleFactor:2 });
await p.goto('http://localhost:5173',{waitUntil:'networkidle'});
const g = p.locator('button:has-text("Google")').first(); if (await g.count()) await g.click();
await p.waitForTimeout(1200);
const sb = await p.locator('.sidebar').boundingBox();
const centre = async (sel,label) => {
  const r = await p.locator(sel).first().boundingBox();
  console.log(label.padEnd(22), 'centre', (sb.x+sb.width - (r.x+r.width/2)).toFixed(1), 'px from panel edge');
};
await centre('.sechead:not(.row) .chev','CHATS chevron');
await centre('.sechead.row .chev','FOLDERS chevron');
await centre('.folderrow .chev','folder row chevron');
await p.locator('.sb-scroll').screenshot({ path:'chev.png' });
await b.close();
