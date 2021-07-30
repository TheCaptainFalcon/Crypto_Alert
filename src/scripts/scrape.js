const axios = require('axios');
const puppeteer = require('puppeteer');
// const firebase = require('firebase');

(async function scrape() {
    // leave as false during development.
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // testing binance just to see if things work as intended
    await page.goto("https://www.binance.com/en/trade/BTC_USDT?theme=dark&type=spot");
    // firebase realtime database
    const firebaseUrl = "https://crypto-alert-12f21-default-rtdb.firebaseio.com/";
    // targets CSS selectors (class)
    const coin_pair = await page.evaluate(() => document.querySelector(".css-mzoqhr").textContent);
    const coin_price = await page.evaluate(() => document.querySelector(".showPrice").textContent);
    const percent_change = await page.evaluate(() => document.querySelector(".tickerPriceText").textContent);

    const data = {
        Pair : coin_pair,
        Price : coin_price,
        Daily_Change : percent_change
    }

    // change to user.uid? to match users' associated alerts
    axios.get(firebaseUrl + "test.json")
        .then((res) => {
            console.log("returning data", res)
            // callback to POST function? - then define underneath as separate function?
        })
        .catch ((err) => {
            console.log("error has occured", err)
        })

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