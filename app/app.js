/**
 * Created by James on 16/11/2015.
 */
'use strict';

var ipc = require('ipc');
var vue = require('./js/vue-test.js');

//var extract = function (urlOrData) {
//    ipc.send('x-ray', urlOrData);
//};
//
//ipc.on('results', function (found) {
//
//});

ipc.on('fetch-complete', function (url) {
    vue.$data.urls.push(url);
});

ipc.on('extracted-data', function (found) {
    console.log(found);
});

ipc.send('start-crawl');

var pauseCrawl = function () {
    ipc.send('pause-crawler', function () {
        vue.$data.crawling = false;
    });
};

var resumeCrawl = function () {
    ipc.send('resume-crawler', function () {
        vue.$data.crawling = true;
    });
};