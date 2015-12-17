/**
 * Created by James on 17/12/2015.
 */

var Extractor = require('../Extractor/simple-extractor.js');//TODO: Make interface.
var Crawler = require('../Crawler/simple-crawler.js');//TODO: Make interface.

var getGsmarenaDataFrom = function (callback, urlOrData) {
    Extractor.extract(urlOrData, callback);
};

ipc.on('x-ray', function (event, urlOrData) {
    mobileFetcher.getGsmarenaDataFrom(urlOrData, function (found) {
        event.sender.send('results', found);
    });
});

var crawler = new Crawler(function (queuedItem) {
    //onFetchComplete callback
    ipc.send('fetch-complete', queuedItem.url);
});

module.exports.getGsmarenaDataFrom = getGsmarenaDataFrom;