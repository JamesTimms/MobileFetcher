/**
 * Created by James on 08/12/2015.
 */

var Crawler = require("js-crawler");

var allowedUrls = new RegExp([
    "^(https?:\/\/)?www.gsmarena.com\/?"
].join('|'));

var disallowedUrls = new RegExp([
    "^(https?:\/\/)?a.gsmarena.com\/",
    "^(https?:\/\/)?www.facebook.com/",
    "^(https?:\/\/)?www.gsmarena.com/[a-zA-Z0-9]+-(blog|3d-spin|pictures|reviews)-[a-zA-Z0-9]+",
    "^(https?:\/\/)?www.gsmarena.com\/compare",
    "^(https?:\/\/)?www.gsmarena.com\/news",
    "^(https?:\/\/)?plusone.google.com"
].join('|'));

console.log(allowedUrls);
console.log(disallowedUrls);

c = new Crawler().configure({
    depth: 2,
    maxRequestsPerSecond: 5,
    maxConcurrentRequests: 2,
    shouldCrawl: function (url) {
        if (allowedUrls.exec(url) === null) {
            console.log('Not an allowed url: ' + url);
            return true;
        }
        if (disallowedUrls.exec(url) !== null) {
            console.log('Not an allowed url: ' + url);
            return true;
        }
        console.log('Allowed: ' + url);
        return true;
    }
});
//    .crawl("http://www.gsmarena.com/", function (page) {
//    console.log(page.url);
//}, function (response) {
//    console.log("ERROR occurred:");
//    console.log(response.status);
//    console.log(response.url);
//}, function onAllFinished(crawledUrls) {
//    console.log('All crawling finished');
//    console.log(crawledUrls);
//});
