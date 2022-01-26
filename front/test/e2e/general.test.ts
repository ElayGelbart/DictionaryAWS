import puppeteer from "puppeteer";
let browser: puppeteer.Browser;
let page: puppeteer.Page;
beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/");
}, 60000);
describe("E2E Tests", () => {
  it("should have page title", async () => {
    expect(await page.title()).toBe("Web Dictionary");
  });

  it("should render elements", async () => {
    const searchDiv = await page.waitForSelector("#searchDiv");
    expect(searchDiv).toBeDefined();
    const searchWordInput = await page.waitForSelector("#searchWordInput");
    expect(searchWordInput).toBeDefined();
    const selectPosInput = await page.waitForSelector("#selectPosInput");
    expect(selectPosInput).toBeDefined();
    const wordTitle = await page.evaluate(() => {
      return document.querySelector(".wordTitle")?.textContent;
    });
    expect(wordTitle).toBe("DICTIONARY");
  });

  it("should search Word and get definition", async () => {
    const searchWordInput = await page.waitForSelector("#searchWordInput");
    searchWordInput?.type("test");
    const searchButton = await page.waitForSelector("#searchDiv > button");
    await searchButton?.click();
    await page.waitForTimeout(3000);
    const wordTitle = await page.evaluate(() => {
      return document.querySelector(".wordTitle")?.textContent;
    });
    expect(wordTitle).toBe("TEST");
    const wordDef = await page.evaluate(() => {
      return document.querySelector(".wordDiv > p")?.textContent;
    });
    expect(wordDef).toContain(
      "A cupel or cupelling hearth in which precious metals"
    );
  });

  it("should search Word By part of speech and get definition", async () => {
    const selectPosDiv = await page.waitForSelector("#selectPosInput");
    await selectPosDiv?.click();
    const VerbOption = await page.waitForSelector('li[data-value="v."]');
    await VerbOption?.click();
    await page.waitForTimeout(500);
    const searchButton = await page.waitForSelector("#searchDiv > button");
    await searchButton?.click();
    await page.waitForTimeout(2000);
    const wordTitle = await page.evaluate(() => {
      return document.querySelector(".wordTitle")?.textContent;
    });
    expect(wordTitle).toBe("TEST");
    const wordDef = await page.evaluate(() => {
      return document.querySelector(".wordDiv > p")?.textContent;
    });
    expect(wordDef).toContain(
      "To refine, as gold or silver, in a test, or cupel"
    );
  }, 7000);

  it("should search new word on click in word definition", async () => {
    const [refineWord] = await page.$x("//span[contains(., 'refine')]");
    await refineWord?.click();
    await page.waitForTimeout(2000);
    const wordTitle = await page.evaluate(() => {
      return document.querySelector(".wordTitle")?.textContent;
    });
    expect(wordTitle).toBe("REFINE");
    const wordDef = await page.evaluate(() => {
      return document.querySelector(".wordDiv > p")?.textContent;
    });
    expect(wordDef).toContain("To become pure");
  });
});
afterAll(async () => {
  await browser.close();
});
