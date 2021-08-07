const axios = require('axios');
const puppeteer = require('puppeteer');
// const firebase = require('firebase');

(async function scrape() {
    // leave as false during development.
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://crypto.com/price");

    // firebase realtime database
    const firebaseUrl = "https://crypto-alert-12f21-default-rtdb.firebaseio.com/";
    
    // crypto.com unable to sort based off name - looks to be mcap
    // price takes slightly longer to load up compared to other elements 
    // even after long timeout to wait for price, unable to grab for some reason - the exception is btc price
    await page.waitForXPath("//*/div[2]/div/div[4]/table/tbody/tr[2]/td[3]/div/div")[0]
    await page.waitForTimeout(5000)

    // btc/usd - dynamic 2nd class name
    const cdc_btc_name = await page.evaluate(() => document.querySelectorAll(".chakra-text")[69].textContent);
    const cdc_btc_price = await page.evaluate(() => document.querySelectorAll(".chakra-text")[71].textContent);
    const cdc_btc_percent = await page.evaluate(() => document.querySelectorAll(".chakra-text")[72].textContent);
    const cdc_btc_mcap = await page.evaluate(() => document.querySelectorAll(".css-hfzjg5")[1].textContent);
    const cdc_btc_vol = await page.evaluate(() => document.querySelectorAll(".css-hfzjg5")[0].textContent);

    // eth/usd
    const cdc_eth_name = await page.evaluate(() => document.querySelectorAll(".chakra-text")[73].textContent);
    // const cdc_eth_price = await page.evaluate(() => document.querySelectorAll(".css-16q9pr7")[1].textContent);
    // Need to split because xpath returns an array
    const cdc_eth_price_arr = await page.$x("//*/div[2]/div/div[4]/table/tbody/tr[2]/td[3]/div/div")[1]
    const cdc_eth_price = await page.evaluate(i => i.textContent, cdc_eth_price_arr);

    const cdc_eth_percent = await page.evaluate(() => document.querySelectorAll(".chakra-text")[75].textContent);
    const cdc_eth_mcap = await page.evaluate(() => document.querySelectorAll(".css-hfzjg5")[3].textContent);
    const cdc_eth_vol = await page.evaluate(() => document.querySelectorAll(".css-hfzjg5")[2].textContent);

    // ada/usd
    const cdc_ada_name = await page.evaluate(() => document.querySelectorAll(".chakra-text")[82].textContent);
    const cdc_ada_price = await page.evaluate(() => document.querySelectorAll(".chakra-text")[83].textContent);
    const cdc_ada_percent = await page.evaluate(() => document.querySelectorAll(".chakra-text")[84].textContent);
    const cdc_ada_mcap = await page.evaluate(() => document.querySelectorAll(".css-hfzjg5")[9].textContent);
    const cdc_ada_vol = await page.evaluate(() => document.querySelectorAll(".css-hfzjg5")[8].textContent);

    // doge/usd
    const cdc_doge_name = await page.evaluate(() => document.querySelectorAll(".chakra-text")[91].textContent);
    const cdc_doge_price = await page.evaluate(() => document.querySelectorAll(".chakra-text")[92].textContent);
    const cdc_doge_percent = await page.evaluate(() => document.querySelectorAll(".chakra-text")[93].textContent);
    const cdc_doge_mcap = await page.evaluate(() => document.querySelectorAll(".css-hfzjg5")[14].textContent);
    const cdc_doge_vol = await page.evaluate(() => document.querySelectorAll(".css-hfzjg5")[15].textContent);

    // bnb/usdt
    const cdc_bnb_name = await page.evaluate(() => document.querySelectorAll(".chakra-text")[79].textContent);
    const cdc_bnb_price = await page.evaluate(() => document.querySelectorAll(".chakra-text")[80].textContent);
    const cdc_bnb_percent = await page.evaluate(() => document.querySelectorAll(".chakra-text")[81].textContent);
    const cdc_bnb_mcap = await page.evaluate(() => document.querySelectorAll(".css-hfzjg5")[7].textContent);
    const cdc_bnb_vol = await page.evaluate(() => document.querySelectorAll(".css-hfzjg5")[6].textContent);


    const cdc_btc = {
        Name : cdc_btc_name,
        Pair : "BTC/USDT",
        Price : cdc_btc_price,
        Daily_Change_Percent : cdc_btc_percent,
        Market_Cap : cdc_btc_mcap,
        Daily_Volume : cdc_btc_vol,
    }

    const cdc_eth = {
        Name : cdc_eth_name,
        Pair : "ETH/USDT",
        Price : cdc_eth_price,
        Daily_Change_Percent : cdc_eth_percent,
        Market_Cap : cdc_eth_mcap,
        Daily_Volume : cdc_eth_vol
    }
    
    const cdc_ada = {
        Name : cdc_ada_name,
        Pair : "ADA_USDT",
        Price : cdc_ada_price,
        Daily_Change_Percent : cdc_ada_percent,
        Market_Cap : cdc_ada_mcap,
        Daily_Volume : cdc_ada_vol
    }
    
    const cdc_doge = {
        Name : cdc_doge_name,
        Pair : "DOGE_USDT",
        Price : cdc_doge_price,
        Daily_Change_Percent : cdc_doge_percent,
        Market_Cap : cdc_doge_mcap,
        Daily_Volume : cdc_doge_vol
    }
    
    const cdc_bnb = {
        Name : cdc_bnb_name,
        Pair : "BNB_USDT",
        Price : cdc_bnb_price,
        Daily_Change_Percent : cdc_bnb_percent,
        Market_Cap : cdc_bnb_mcap,
        Daily_Volume : cdc_bnb_vol
    }

    axios.put(firebaseUrl + "Crypto/BTC.json", cdc_btc)
        .then((res) => {
            console.log('Crypto.com - BTC Updated', cdc_btc)
        })
        .catch((err) => {
            console.log('error has occurred', err)
        })

    axios.put(firebaseUrl + "Crypto/ETH.json", cdc_eth)
        .then((res) => {
            console.log('Crypto.com - ETH Updated', cdc_eth)
            // console.log(cdc_eth_price_arr)
            console.log(cdc_eth_price)

        })
        .catch((err) => {
            console.log('error has occurred', err)
        })

    axios.put(firebaseUrl + "Crypto/ADA.json", cdc_ada)
        .then((res) => {
            console.log('Crypto.com - ADA Updated', cdc_ada)
        })
        .catch((err) => {
            console.log('error has occurred', err)
        })

    axios.put(firebaseUrl + "Crypto/DOGE.json", cdc_doge)
        .then((res) => {
            console.log('Crypto.com - DOGE Updated', cdc_doge)
        })
        .catch((err) => {
            console.log('error has occurred', err)
        })

    axios.put(firebaseUrl + "Crypto/BNB.json", cdc_bnb)
        .then((res) => {
            console.log('Crypto.com - BNB Updated', cdc_bnb)
        })
        .catch((err) => {
            console.log('error has occurred', err)
        })
        
   await browser.close();

})();