/**
 * Created by James on 08/12/2015.
 */

//var Crawler = require('js-crawler');
var Crawler = require("simplecrawler");
var RobotsTxt = require("./test-robots.js");
var Vue = require("Vue");

var v = new Vue({
    el: '#data',
    data: {
        crawling: true,
        urls: ['www.example.com', 'www.example2.com']
    }
});

var httpsOpt = "^(https?:\/\/)?(www.)?";
var gsmarenaDomain = "^(https?:\/\/)?(www.)?gsmarena.com\/";

var allowedUrls = new RegExp([
    gsmarenaDomain + "?"
].join('|'));

var disallowedUrls = new RegExp([
    gsmarenaDomain + "a.gsmarena.com\/",
    httpsOpt + "facebook.com/",
    gsmarenaDomain + "/[a-zA-Z0-9]+-(blog|3d-spin|pictures|reviews)-[a-zA-Z0-9]+",
    gsmarenaDomain + "compare | news",
    httpsOpt + "plusone.google.com"
].join('|'));

//var myCrawler = new OtherCrawler("http://www.gsmarena.com/");
var myCrawler = new Crawler("www.gsmarena.com", "/", 80);
myCrawler.maxDepth = 1;
myCrawler.maxConcurrency = 1;
myCrawler.interval = 100000;

myCrawler.on("fetchcomplete", function (queueItem, responseBuffer, response) {
    console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
    console.log("It was a resource of type %s", response.headers['content-type']);
});

myCrawler.on("fetchstart", function () {
    console.log("Fetch started!");
});

myCrawler.on("complete", function () {
    console.log("Completed the crawl");
    console.log(myCrawler.queue);
    myCrawler.stop();
});

myCrawler.on("queueerror", function () {
    console.log("error with queue");
});
myCrawler.on("fetcherror", function () {
    console.log("error with fetch");
});
myCrawler.on("fetchdataerror", function () {
    console.log("error with fetch data");
});

myCrawler.on("queueadd", function (queuedItem) {
    console.log("Queued item: " + queuedItem.url);
    v.$data.urls.push(queuedItem.url);
});

myCrawler.on("crawlstart", function () {
    console.log("Crawl Started!");
});

var conditionID = myCrawler.addFetchCondition(function (parsedURL) {
    return !parsedURL.path.match(disallowedUrls) && RobotsTxt(parsedURL);
});

process.nextTick(function() {
    myCrawler.start();
});

var pauseCrawl = function () {
    myCrawler.queue.freeze("crawledUrls.json", function (err) {
        console.log("FREEZE!");
        console.log("FREEZE error: " + err);
        //process.exit();
    });
};

var resumeCrawl = function () {
    crawler.queue.defrost("crawledUrls.json");
};

//c = new Crawler().configure({
//    depth: 2,
//    maxRequestsPerSecond: 5,
//    maxConcurrentRequests: 2,
//    shouldCrawl: function (url) {
//        if (allowedUrls.exec(url) === null) {
//            console.log('Not an allowed url: ' + url);
//            return true;
//        }
//        if (disallowedUrls.exec(url) !== null) {
//            console.log('Not an allowed url: ' + url);
//            return true;
//        }
//        console.log('Allowed: ' + url);
//        return true;
//    }
//});
//    .crawl("http://www.gsmarena.com/", function (page) {
//    console.log(page.url);
//}, function (response) {
//    console.log("ERROR occurred:");
//    console.log(response.status);
//    console.log(response.url);
//}, function onAllFinished(crawledUrls) {
//    console.log('All crawling finished');
//    console.log(crawledUrls);
//});/

//console.info(v.$data.urls);
//v.$data.urls.push('test.com');
//v.$data.urls.push('test2.com');