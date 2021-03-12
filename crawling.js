const urlData = require("./copyUrlData");
const puppeteer = require("puppeteer");
const io = require("socket.io-client");
const cheerio = require("cheerio");
const axios = require("axios");
const socket = io("http://localhost:3002");
require("dotenv").config();
const port = process.env.PORT || 3011;
const login = async (page) => {
  try {
    await page.type("#email", process.env.EMAIL);
    await page.type("#password", process.env.PASSWORD);
    await page.click("button.g-recaptcha");
    await page.waitForResponse((response) => {
      return response.url() === "https://cutt.ly/scripts/getHidden.php";
    });
  } catch (e) {
    console.log(e);
  }
};

const makeUrl = async (page) => {
  try {
    socket.on("newData", async (data) => {
      for (let i = 0; i < 100; i++) {
        await page.type("#link", data);
        await page.click("button.btn_cutt");

        await page.waitForSelector("button");
        await copyShortUrl(page, data);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const copyShortUrl = async (page, data) => {
  try {
    await page.waitFor(3000);
    const content = await page.content();

    const $ = cheerio.load(content);
    const textList = $.text().replace(/(\s*)/g, "");
    let reg = /(?<=close)((http(s)?:\/\/)([\w\/]+\.*)+[\w]{2,4}(?=[\d+]click))/i;
    const url = reg.exec(textList);
    urlData.setShortUrl(url[0]);
    socket.emit("shortLink", url[0]);
    return axios
      .post(`http://localhost:${port}/routes/shortUrl`, {
        beforeUrl: data,
        afterUrl: url[0],
      })
      .then((res) => {
        console.log("db생성완료");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (e) {
    console.log(e);
  }
};

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ["--window-size=1920,1080"] });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 1080,
  });
  await page.goto("https://cutt.ly/login");
  await login(page);
  await makeUrl(page);
  // await browser.close();
})();
