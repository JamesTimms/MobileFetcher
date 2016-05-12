/**
 * Created by James on 16/11/2015.
 */
'use strict';

var ipc = require('ipc');
var vue = require('./js/vue-test.js');

ipc.on('extraction-complete', function (url) {
    // vue.$data.urls.push({
    //     u: url,
    //     found: 'looking'
    // });
    vue.$data.extractionCount += 1;
});

ipc.on('queue-add', function (url) {
    vue.$data.queueCount += 1;
});

ipc.on('extracted-data', function (found, url) {
    console.log('--------------------------------------');
    console.log('Extracted: ' + url);
    console.info(found);
    console.log(found['title']);//TODO: Debugging here to find out why some pages are extracted that shouldn't be
    console.log('--------------------------------------');
});

ipc.send('start-crawl');
vue.$data.crawling = true;

var pauseCrawl = function () {
    ipc.send('pause-crawler');
    vue.$data.crawling = false;
};

var resumeCrawl = function () {
    ipc.send('resume-crawler');
    vue.$data.crawling = true;
};

vue.$data.functions.pauseCrawl = pauseCrawl;
vue.$data.functions.resumeCrawl = resumeCrawl;
