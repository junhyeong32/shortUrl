const urlData = require("./copyUrlData");
const puppeteer = require("puppeteer");
const io = require("socket.io-client");
const cheerio = require("cheerio");
const axios = require("axios");
const socket = io("http://localhost:3002");
require("dotenv").config();
const port = process.env.PORT || 3011;
// const login = async (page) => {
//   try {
//     await page.type("#email", process.env.EMAIL);
//     await page.type("#password", process.env.PASSWORD);
//     await page.click("button.g-recaptcha");
//     await page.waitForResponse((response) => {
//       return response.url() === "https://cutt.ly/scripts/getHidden.php";
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

// const makeUrl = async (page) => {
//   try {
//     socket.on("newData", async (data) => {
//       console.log(data);
//       await page.type("#link", data);
//       await page.click("button.btn_cutt");

//       await page.waitForSelector("button");
//       await copyShortUrl(page, data);
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ["--window-size=1920,1080"] });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 1080,
  });
  await page.goto("https://nid.naver.com/nidlogin.login?mode=form&url=https%3A%2F%2Fwww.naver.com");
  // await login(page);
  // await makeUrl(page);
  // await browser.close();
})();
