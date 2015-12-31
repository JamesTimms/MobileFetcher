/**
 * Created by James on 16/11/2015.
 */
'use strict';

var ipc = require('ipc');
var vue = require('./js/vue-test.js');

ipc.on('fetch-complete', function (url) {
    vue.$data.urls.push({
        u: url,
        found: 'looking'
    });
});

ipc.on('extracted-data', function (found) {
    console.log(found);
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