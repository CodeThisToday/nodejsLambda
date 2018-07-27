const request = require('axios');
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const { petsFromHTML } = require('./helper');


module.exports.petlist = (event, context, callback) => {
    let allPets;

    request('https://www.adoptapet.com/recent-pets')
        .then(({data}) => {
            const pets = petsFromHTML(data);
            console.log(pets);
            console.log("success in fetching list");
        })
        .then(() => {
            return dynamo.put({
                TableName: 'petlist',
                Item: {
                    petId: new Date().toString(),
                    pets: allPets
                }
            }).promise();
        })
        .catch(callback);
};

module.exports.seleniumtest = (event, context, callback) => {
    var webdriver = require('selenium-webdriver');
    var chrome = require('selenium-webdriver/chrome');
    var builder = new webdriver.Builder().forBrowser('chrome');
    var chromeOptions = new chrome.Options();
    const defaultChromeFlags = [
        '--headless',
        '--disable-gpu',
        '--window-size=1280x1696', // Letter size
        '--no-sandbox',
        '--user-data-dir=/tmp/user-data',
        '--hide-scrollbars',
        '--enable-logging',
        '--log-level=0',
        '--v=99',
        '--single-process',
        '--data-path=/tmp/data-path',
        '--ignore-certificate-errors',
        '--homedir=/tmp',
        '--disk-cache-dir=/tmp/cache-dir'
    ];

    chromeOptions.setChromeBinaryPath("/var/task/lib/chrome");
    chromeOptions.addArguments(defaultChromeFlags);
    builder.setChromeOptions(chromeOptions);

    var driver = builder.build();

    driver.get('https://www.google.com/');
    html = driver.getPageSource();

    driver.getTitle().then(function(title) {
        console.log("Page title for " + event.url + " is " + title);
        callback(null, 'My title is: ' + title);
    });

    driver.close();
    driver.quit();
};
