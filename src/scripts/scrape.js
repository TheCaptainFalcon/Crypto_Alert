const axios = require('axios');
const puppeteer = require('puppeteer');
// const firebase = require('firebase');

(async function scrape() {
    // leave as false during development.
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.binance.us/en/markets");

    // firebase realtime database
    const firebaseUrl = "https://crypto-alert-12f21-default-rtdb.firebaseio.com/";

    await page.waitForSelector(".bnc-btn-text")
        .then(await page.click(".bnc-btn-text"));
    
    // by default data is sorted by 24 hr vol - this switches it based on name to remain constant
    await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__headerTruncatedText")[1].click());

    // BINANCE-US SCRAPING ***********

    // btc/usd
    const btc_pair = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[91].textContent);
    const btc_name = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[92].textContent);
    const btc_price = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[93].textContent);
    const btc_percent = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[94].textContent);
    const btc_mcap = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[97].textContent);
    const btc_vol = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[98].textContent);

    // eth/usd
    const eth_pair = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[181].textContent);
    const eth_name = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[182].textContent);
    const eth_price = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[183].textContent);
    const eth_percent = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[184].textContent);
    const eth_mcap = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[187].textContent);
    const eth_vol = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[188].textContent);

    // ada/usd
    const ada_pair = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[10].textContent);
    const ada_name = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[11].textContent);
    const ada_price = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[12].textContent);
    const ada_percent = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[13].textContent);
    const ada_mcap = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[16].textContent);
    const ada_vol = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[17].textContent);

    // // doge/usd
    const doge_pair = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[136].textContent);
    const doge_name = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[137].textContent);
    const doge_price = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[138].textContent);
    const doge_percent = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[149].textContent);
    const doge_mcap = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[142].textContent);
    const doge_vol = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[143].textContent);

    // // bnb/usdt
    const bnb_pair = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[82].textContent);
    const bnb_name = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[83].textContent);
    const bnb_price = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[84].textContent);
    const bnb_percent = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[85].textContent);
    const bnb_mcap = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[88].textContent);
    const bnb_vol = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[89].textContent);

    // volume is based on USD overall not by pairs

    const btc = {
        Name : btc_name,
        Pair : btc_pair,
        Price : btc_price,
        Daily_Change_Percent : btc_percent,
        Market_Cap : btc_mcap,
        Daily_Volume : btc_vol,
    }

    const eth = {
        Name : eth_name,
        Pair : eth_pair,
        Price : eth_price,
        Daily_Change_Percent : eth_percent,
        Market_Cap : eth_mcap,
        Daily_Volume : eth_vol
    }
    
    const ada = {
        Name : ada_name,
        Pair : ada_pair,
        Price : ada_price,
        Daily_Change_Percent : ada_percent,
        Market_Cap : ada_mcap,
        Daily_Volume : ada_vol
    }
    
    const doge = {
        Name : doge_name,
        Pair : doge_pair,
        Price : doge_price,
        Daily_Change_Percent : doge_percent,
        Market_Cap : doge_mcap,
        Daily_Volume : doge_vol
    }
    
    const bnb = {
        Name : bnb_name,
        Pair : bnb_pair,
        Price : bnb_price,
        Daily_Change_Percent : bnb_percent,
        Market_Cap : bnb_mcap,
        Daily_Volume : bnb_vol
    }

    axios.put(firebaseUrl + "BinanceUS/BTC.json", btc)
        .then((res) => {
            console.log('BinanceUS - BTC Updated', res)
        })
        .catch((err) => {
            console.log('error has occurred', err)
        })

    axios.put(firebaseUrl + "BinanceUS/ETH.json", eth)
        .then((res) => {
            console.log('BinanceUS - ETH Updated', res)
        })
        .catch((err) => {
            console.log('error has occurred', err)
        })

    axios.put(firebaseUrl + "BinanceUS/ADA.json", ada)
        .then((res) => {
            console.log('BinanceUS - ADA Updated', res)
        })
        .catch((err) => {
            console.log('error has occurred', err)
        })

    axios.put(firebaseUrl + "BinanceUS/DOGE.json", doge)
        .then((res) => {
            console.log('BinanceUS - DOGE Updated', res)
        })
        .catch((err) => {
            console.log('error has occurred', err)
        })

    axios.put(firebaseUrl + "BinanceUS/BNB.json", bnb)
        .then((res) => {
            console.log('BinanceUS - BNB Updated', res)
        })
        .catch((err) => {
            console.log('error has occurred', err)
        })
        
    // COINBASE SCRAPING *********

    await page.goto("https://www.coinbase.com/price");
    await page.waitForSelector(".FilterItem__WrapDense-sc-193z897-1")
        // safety guard
        .then(await page.waitForTimeout(1000))
    // sorts by tradeable (must be in this order: tradeable > name)
    await page.evaluate(() => document.querySelectorAll(".FilterItem__StyledLink-sc-193z897-2")[1].click())
    // sorts by name
    await page.waitForSelector(".AssetTableHelpers__Th-sc-1o9oxiy-4")
        .then(await page.click(".AssetTableHelpers__Th-sc-1o9oxiy-4"))
    // safety guard for scrape
    await page.waitForTimeout(1000);

    // btc/usd - page 1
    const coinbase_btc_name = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[126].textContent)
    const coinbase_btc_pair = "BTC/USD"
    const coinbase_btc_price = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[128].textContent);
    const coinbase_btc_percent = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[130].textContent);
    const coinbase_btc_vol = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[131].textContent);
    const coinbase_btc_mcap = await page.evaluate(() =>  document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[132].textContent);
    
    // ada/usd - page 1
    const coinbase_ada_name = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[142].textContent);
    const coinbase_ada_pair = "ADA/USD"
    const coinbase_ada_price = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[144].textContent);
    const coinbase_ada_percent = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[146].textContent);
    const coinbase_ada_vol = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[147].textContent);
    const coinbase_ada_mcap = await page.evaluate(() => document.querySelectorAll(".TextElement__Spacer-hxkcw5-0")[148].textContent);
   
    // coinbase btc data
    const coinbase_btc_data = {
        Name : coinbase_btc_name,
        Pair : coinbase_btc_pair,
        Price : coinbase_btc_price,
        Daily_Change_Percent : coinbase_btc_percent,
        Market_Cap : coinbase_btc_mcap,
        Daily_Volume : coinbase_btc_vol
    }

    // coinbase ada data
    const coinbase_ada_data = {
        Name : coinbase_ada_name,
        Pair : coinbase_ada_pair,
        Price : coinbase_ada_price,
        Daily_Change_Percent : coinbase_ada_percent,
        Market_Cap : coinbase_ada_mcap,
        Daily_Volume : coinbase_ada_vol
    }

    await axios.put(firebaseUrl + "Coinbase/BTC.json", coinbase_btc_data)
        .then((res) => {
            console.log("Coinbase - BTC Updated", coinbase_btc_data)
        })
        .catch((err) => {
            console.log("error has occurred", err)
        })

    
    await axios.put(firebaseUrl + "Coinbase/ADA.json", coinbase_ada_data) 
            .then((res) => {
                console.log("Coinbase - ADA Updated", coinbase_ada_data)
            })
            .catch((err) => {
                console.log("error has occured", err)
            })

    await browser.close();

})();