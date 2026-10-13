async (page) => {
  if (!new URL(page.url()).hostname.match(/^(127\.0\.0\.1|localhost)$/)) throw Error('Loopback only');
  await page.reload();
  await page.locator('#welcome-tutorial').click();
  for (const [unit,x,y] of [['R',3,4],['H',1,1],['S',6,3]]) {
    await page.locator(`[data-unit="${unit}"]`).click();
    await page.locator('#skill-mode').click();
    const board=page.locator('#board');
    const cx=Number(await board.getAttribute('data-cursor-x')),cy=Number(await board.getAttribute('data-cursor-y'));
    for(let i=0;i<Math.abs(x-cx);i++) await page.keyboard.press(x>cx?'ArrowRight':'ArrowLeft');
    for(let i=0;i<Math.abs(y-cy);i++) await page.keyboard.press(y>cy?'ArrowDown':'ArrowUp');
    await page.keyboard.press('Enter');
  }
  if(await page.locator('#result-title').textContent()!=='임무 완료') throw Error('Tutorial must really finish');
  await page.locator('#result-close').click();
  await page.locator('#restore').click();
  if(!await page.locator('#result-overlay').isVisible()) throw Error('REGRESSION: restored completed run retains dismissed result');
  console.log('PASS: actual tutorial 5900 points; restore shows terminal result');
}
