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

    // only works with fast internet speed - change to navigation or selector later
    await page.waitForTimeout(3000)
    .then(await page.click(".bnc-btn-text"))

    // btc/usd
    const btc_pair = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[10].textContent);
    const btc_name = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[11].textContent);
    const btc_price = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[12].textContent);
    const btc_percent = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[13].textContent);
    const btc_mcap = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[16].textContent);
    const btc_vol = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[17].textContent);

    // eth/usd
    const eth_pair = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[1].textContent);
    const eth_name = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[2].textContent);
    const eth_price = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[3].textContent);
    const eth_percent = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[4].textContent);
    const eth_mcap = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[7].textContent);
    const eth_vol = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[8].textContent);

    // ada/usd
    const ada_pair = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[64].textContent);
    const ada_name = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[65].textContent);
    const ada_price = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[66].textContent);
    const ada_percent = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[67].textContent);
    const ada_mcap = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[70].textContent);
    const ada_vol = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[71].textContent);

    // doge/usd
    const doge_pair = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[73].textContent);
    const doge_name = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[74].textContent);
    const doge_price = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[75].textContent);
    const doge_percent = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[76].textContent);
    const doge_mcap = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[79].textContent);
    const doge_vol = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[80].textContent);

    // bnb/usdt
    const bnb_pair = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[82].textContent);
    const bnb_name = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[83].textContent);
    const bnb_price = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[84].textContent);
    const bnb_percent = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[85].textContent);
    const bnb_mcap = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[88].textContent);
    const bnb_vol = await page.evaluate(() => document.querySelectorAll(".ReactVirtualized__Table__rowColumn")[89].textContent);


    // targets CSS selectors (class)
    // Binance.com - BTC/USDT

    // const coin_pair = await page.evaluate(() => document.querySelector(".css-mzoqhr").textContent);
    // const coin_price = await page.evaluate(() => document.querySelector(".showPrice").textContent);
    // const percent_change = await page.evaluate(() => document.querySelector(".tickerPriceText").textContent);
    
    // const btc_pair = await page.evaluate(() => document.querySelector("div.sc-62mpio-0.dswIdD").textContent);
    // const btc_price = await page.evaluate(() => document.querySelectorAll(".sc-1p4en3j-3")[0].textContent);
    // const btc_amount = await page.evaluate(() => document.querySelectorAll(".sc-1p4en3j-3")[2].textContent);
    // const btc_percent = await page.evaluate(() => document.querySelectorAll(".sc-1p4en3j-3")[3].textContent);

   
    // because dynamically altered class names - best to target just the first and index specific
    // sc-1p4en3j-3 sc-1p4en3j-5 klZHmQ 
    // sc-1p4en3j-3 sc-1p4en3j-4 fgGHac
    // sc-1p4en3j-3 sc-1p4en3j-6 ioZlmt

    // volume is based on USD overall not by pairs

    const btc = {
        Name : btc_name,
        Pair : btc_pair,
        Price : btc_price,
        Daily_Change_Percent : btc_percent,
        Market_Cap : btc_mcap,
        Daily_Volume : btc_vol,
        // Daily_Change_Amount :  btc_amount,
        // // removes all whitespace
        // Daily_Change_Percent : btc_percent
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

    // change to user.uid? to match users' associated alerts
    // axios.get(firebaseUrl + "test.json")
    //     .then((res) => {
    //         console.log("returning data", res)
    //         // callback to POST function? - then define underneath as separate function?
    //     })
    //     .catch ((err) => {
    //         console.log("error has occured", err)
    //     })

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
        
// next exchange--
//    await page.goto("")
    // await browser.close();

})();