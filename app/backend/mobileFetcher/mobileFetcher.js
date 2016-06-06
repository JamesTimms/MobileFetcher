/**
 * Created by James on 17/12/2015.
 */
const ipc = require('ipc');
var Extractor = require('../Extractor/simple-extractor.js'); //TODO: Make interface.
var Crawler = require('../Crawler/simple-crawler.js'); //TODO: Make interface.
var dataParser = require('../../js/data-parser.js');

var fileWriter = '';

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
    // var d = new Date();
    // var fileName = '../storage/' + d.getYear() + '-' + d.getMonth() + '-' + d.getDay() + '_' + 'test_data' + '.csv';
    fileWriter = new dataParser('./app/storage/test_data.csv');

    crawler.c.on('queueadd', function(queuedItem) {
        // console.log("Queued Item!");
        webContents.send('queue-add', '');
    });

    var extract = function(queueItem, responseBuffer) {
        webContents.send('fetch-complete', '');
        Extractor(responseBuffer, function(found) {
            found['source_url'] = queueItem.url;
            fileWriter.deviceDataToFile(found);
            webContents.send('extraction-complete', '');
        });
    }

    crawler.c.on("fetchcomplete", function(queueItem, responseBuffer, response) {
        // console.log("Fetch Complete!");
        // console.log("--------------------------------------------------------------------------------");
        // console.log("queue items complete: " + crawler.c.queue.complete);
        // console.log("queue items errors: " + crawler.c.queue.errors);
        // console.log("--------------------------------------------------------------------------------");
        extract(queueItem, responseBuffer);
    });

    //crawler.c.discoverResources = function (buf, queueItem) {
    //    console.log(buf);
    //    console.log(queueItem);`
    //    crawler.c.queueURL('www.gsmarena.com/makers.php3', queueItem);
    //    return [];
    //};

    crawler.c.on("complete", function() {
        console.log("Completed the crawl");
        // console.log("--------------------------------------------------------------------------------");
        // console.log("queue items complete: " + crawler.c.queue.complete();
        // console.log("queue items errors: " + crawler.c.queue.errors();
        // console.log("--------------------------------------------------------------------------------");
        crawler.c.queue.forEach(function(webpage) {
            extract('', webpage);
        })
    });

    ipc.on('start-crawl', function() {
        crawler.start();
    });

    ipc.on('pause-crawler', crawler.buildPause());
    ipc.on('resume-crawler', crawler.buildResume());
};
