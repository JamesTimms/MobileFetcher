/**
 * Created by James on 17/12/2015.
 */
const ipc = require('ipc');
var Extractor = require('../Extractor/simple-extractor.js');//TODO: Make interface.
var Crawler = require('../Crawler/simple-crawler.js');//TODO: Make interface.

//var getGsmarenaDataFrom = function (callback, urlOrData) {
//    Extractor.extract(urlOrData, callback);
//};
//
//ipc.on('x-ray', function (event, urlOrData) {
//    mobileFetcher.getGsmarenaDataFrom(urlOrData, function (found) {
//        event.sender.send('results', found);
//    });
//});
module.exports = function MobileFetcher(fetchCallback) {
    var crawler = new Crawler(fetchCallback);

    ipc.on('start-crawl', function () {
        crawler.start();
    });

    ipc.on('pause-crawler', crawler.pause);
    ipc.on('resume-crawler', crawler.resume);
};