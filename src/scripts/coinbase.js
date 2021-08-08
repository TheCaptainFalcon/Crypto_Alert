const axios = require('axios');
const puppeteer = require('puppeteer');

(async function coinbase() {
    // leave as false during development.
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.coinbase.com/price");

    // firebase realtime database
    const firebaseUrl = "https://crypto-alert-12f21-default-rtdb.firebaseio.com/";

    await page.waitForSelector(".FilterItem__WrapDense-sc-193z897-1")
        // safety guard
        .then(await page.waitForTimeout(1000))
    // sorts by tradeable (must be in this order: tradeable > name)
    await page.evaluate(() => document.querySelectorAll(".FilterItem__StyledLink-sc-193z897-2")[1].click())
    // sorts by name
    // await page.waitForSelector(".AssetTableHelpers__Th-sc-1o9oxiy-4")
    //     .then(await page.click(".AssetTableHelpers__Th-sc-1o9oxiy-4"))
    // safety guard for scrape
    // await page.waitForTimeout(1000);
    await page.click(".SimpleInput__HiddenInput-sc-1o8jstm-2", { clickCount: 3 });
    await page.type(".SimpleInput__HiddenInput-sc-1o8jstm-2", "bitcoin")
    await page.waitForTimeout(1500);

    // could separate url to split work for coins on page 1, 2, 3, etc.

    // btc/usd - page 1
    const coinbase_btc_name = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[14].textContent)
    const coinbase_btc_pair = "BTC/USD"
    const coinbase_btc_price = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[16].textContent);
    const coinbase_btc_percent = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[18].textContent);
    const coinbase_btc_vol = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[19].textContent);
    const coinbase_btc_mcap = await page.evaluate(() =>  document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[20].textContent);

    // coinbase btc data
    const coinbase_btc_data = {
        Name : coinbase_btc_name,
        Pair : coinbase_btc_pair,
        Price : coinbase_btc_price,
        Daily_Change_Percent : coinbase_btc_percent,
        Market_Cap : coinbase_btc_mcap,
        Daily_Volume : coinbase_btc_vol
    }
    
    await axios.put(firebaseUrl + "Coinbase/BTC.json", coinbase_btc_data)
    .then((res) => {
        console.log("Coinbase - BTC Updated", coinbase_btc_data)
    })
    .catch((err) => {
        console.log("error has occurred", err)
    })


    await page.click(".SimpleInput__HiddenInput-sc-1o8jstm-2", { clickCount: 3 })
    await page.type(".SimpleInput__HiddenInput-sc-1o8jstm-2", "cardano")
    await page.waitForTimeout(1500);

    // ada/usd - page 1
    const coinbase_ada_name = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[14].textContent);
    const coinbase_ada_pair = "ADA/USD"
    const coinbase_ada_price = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[16].textContent);
    const coinbase_ada_percent = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[18].textContent);
    const coinbase_ada_vol = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[19].textContent);
    const coinbase_ada_mcap = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[20].textContent);


    // coinbase ada data
    const coinbase_ada_data = {
        Name : coinbase_ada_name,
        Pair : coinbase_ada_pair,
        Price : coinbase_ada_price,
        Daily_Change_Percent : coinbase_ada_percent,
        Market_Cap : coinbase_ada_mcap,
        Daily_Volume : coinbase_ada_vol
    }

    await axios.put(firebaseUrl + "Coinbase/ADA.json", coinbase_ada_data) 
        .then((res) => {
            console.log("Coinbase - ADA Updated", coinbase_ada_data)
        })
        .catch((err) => {
            console.log("error has occured", err)
        })

    // Added promise.all to complete these set of promises before continuing the execution of the code
    // this is to prevent the scraping of data all from page 1 instead of by steps
    
    // click on next page ********
    // await page.evaluate(() => document.querySelectorAll(".Text__Font-sc-163p65w-0")[1].click())
    // await page.waitForSelector(".TextElement__Spacer-hxkcw5-0");
    // await page.waitForTimeout(1000);
    await page.click(".SimpleInput__HiddenInput-sc-1o8jstm-2", { clickCount: 3 })
    await page.type(".SimpleInput__HiddenInput-sc-1o8jstm-2", "dogecoin")
    await page.waitForTimeout(3000);

    // doge/usd - page 2
    const coinbase_doge_name = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[14].textContent);
    const coinbase_doge_pair = "DOGE/USD"
    const coinbase_doge_price = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[16].textContent);
    const coinbase_doge_percent = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[18].textContent);
    const coinbase_doge_vol = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[19].textContent);
    const coinbase_doge_mcap = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[20].textContent);

    const coinbase_doge_data = {
        Name : coinbase_doge_name,
        Pair : coinbase_doge_pair,
        Price : coinbase_doge_price,
        Daily_Change_Percent : coinbase_doge_percent,
        Market_Cap : coinbase_doge_mcap,
        Daily_Volume : coinbase_doge_vol
    }

    await axios.put(firebaseUrl + "Coinbase/DOGE.json", coinbase_doge_data)
        .then((res) => {
            console.log("Coinbase - DOGE Updated", coinbase_doge_data)
        })
        .catch((err) => {
            console.log("error has occured", err)
        })

    await page.click(".SimpleInput__HiddenInput-sc-1o8jstm-2", { clickCount: 3 })
    await page.type(".SimpleInput__HiddenInput-sc-1o8jstm-2", "ether")
    await page.waitForTimeout(3000);

   // eth/usd - page 2
   const coinbase_eth_name = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[14].textContent);
   const coinbase_eth_pair = "ETH/USD"
   const coinbase_eth_price = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[16].textContent);
   const coinbase_eth_percent = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[18].textContent);
   const coinbase_eth_vol = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[19].textContent);
   const coinbase_eth_mcap = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[20].textContent);

   const coinbase_eth_data = {
       Name : coinbase_eth_name,
       Pair : coinbase_eth_pair,
       Price : coinbase_eth_price,
       Daily_Change_Percent : coinbase_eth_percent,
       Market_Cap : coinbase_eth_mcap,
       Daily_Volume : coinbase_eth_vol
   }

    await axios.put(firebaseUrl + "Coinbase/ETH.json", coinbase_eth_data)
        .then((res) => {
            console.log("Coinbase - ETH Updated", coinbase_eth_data)
        })
        .catch((err) => {
            console.log("error has occured", err)
        })     

    await browser.close();

})();