/**
 * Created by James on 17/12/2015.
 */
const ipc = require('ipc');
var Extractor = require('../Extractor/simple-extractor.js');//TODO: Make interface.
var Crawler = require('../Crawler/simple-crawler.js');//TODO: Make interface.
var dataParser = require('../../js/data-parser.js');

//var getGsmarenaDataFrom = function (callback, urlOrData) {
//    Extractor.extract(urlOrData, callback);
//};
//
//ipc.on('x-ray', function (event, urlOrData) {
//    mobileFetcher.getGsmarenaDataFrom(urlOrData, function (found) {
//        event.sender.send('results', found);
//    });
//});
module.exports = function MobileFetcher(webContents) {
    var crawler = new Crawler();

    crawler.c.on('queueadd', function (queuedItem) {
        //onFetchComplete callback
        //console.log("Queued Item!");
        webContents.send('fetch-complete', queuedItem.url);
    });

    crawler.c.on("fetchcomplete", function (queueItem, responseBuffer, response) {
        console.log("Fetch Complete!");
        Extractor(responseBuffer, function (found) {
            webContents.send('extracted-data', found);
            dataParser(found);
        });
    });

    ipc.on('start-crawl', function () {
        crawler.start();
    });

    ipc.on('pause-crawler', crawler.buildPause());
    ipc.on('resume-crawler', crawler.buildResume());
};