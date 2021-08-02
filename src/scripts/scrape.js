const axios = require('axios');
const puppeteer = require('puppeteer');
// const firebase = require('firebase');

(async function scrape() {
    // leave as false during development.
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.binance.us/en/trade/BTC_USDT");

    // firebase realtime database
    const firebaseUrl = "https://crypto-alert-12f21-default-rtdb.firebaseio.com/";
    // targets CSS selectors (class)
    // Binance.us - BTC/USDT

    // const coin_pair = await page.evaluate(() => document.querySelector(".css-mzoqhr").textContent);
    // const coin_price = await page.evaluate(() => document.querySelector(".showPrice").textContent);
    // const percent_change = await page.evaluate(() => document.querySelector(".tickerPriceText").textContent);

    // only works with fast internet speed - change to navigation or selector later
    await page.waitForTimeout(3000)

    .then(await page.click(".bnc-btn-text"))
    
    const btc_pair = await page.evaluate(() => document.querySelector("div.sc-62mpio-0.dswIdD").textContent);
    const btc_price = await page.evaluate(() => document.querySelectorAll(".sc-1p4en3j-3")[0].textContent);
    const btc_amount = await page.evaluate(() => document.querySelectorAll(".sc-1p4en3j-3")[2].textContent);
    const btc_percent = await page.evaluate(() => document.querySelectorAll(".sc-1p4en3j-3")[3].textContent);

   
    // because dynamically altered class names - best to target just the first and index specific
    // sc-1p4en3j-3 sc-1p4en3j-5 klZHmQ 
    // sc-1p4en3j-3 sc-1p4en3j-4 fgGHac
    // sc-1p4en3j-3 sc-1p4en3j-6 ioZlmt


    const data = {
        Pair : btc_pair,
        Price : `$` + btc_price,
        Daily_Change_Amount :  btc_amount,
        // removes all whitespace
        Daily_Change_Percent : btc_percent.replace(/\s/g, "")
    }
    
    // change to user.uid? to match users' associated alerts
    // axios.get(firebaseUrl + "test.json")
    //     .then((res) => {
    //         console.log("returning data", res)
    //         // callback to POST function? - then define underneath as separate function?
    //     })
    //     .catch ((err) => {
    //         console.log("error has occured", err)
    //     })

    // axios.post(firebaseUrl + "test.json", data)
    //     .then((res) => {
    //         console.log(res)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })

    console.log(data);
    await browser.close();

})();