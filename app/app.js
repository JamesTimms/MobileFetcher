/**
 * Created by James on 16/11/2015.
 */
'use strict';

var ipc = require('ipc');
var stuff = require('./backend/scraping/test-crawl.js');

stuff("http://www.gsmarena.com/samsung_galaxy_s6-6849.php");

///**
// * @return {string}
// */
//var ImportIoQuery = function (gsmarenaUrl) {
//    return "https://api.import.io/store/data/"
//        + ipc.sendSync("get_connector")
//        + "/_query?"
//        + "input/webpage/url=" + gsmarenaUrl
//        + "&_user=" + ipc.sendSync("get_user")
//        + "&_apikey=" + ipc.sendSync("get_api_key");
//};
//
//var LoadData = function () {
//    var url = document.getElementById('data-url').value;
//
//    var reg = /^(http:\/\/)?www.gsmarena.com\//i;
//    if(reg.exec(url) === null) {
//        console.log('url is invalid. needs to be http://www.gsmarena.com/[device_page]');
//        return;
//    }
//    console.log(ImportIoQuery(url));
//    ipc.send('get-data', ImportIoQuery(url));
//};
//
//document.getElementById('data-button').onclick = LoadData;
//
//ipc.on('import-io-data', function (arg) {
//    console.log(arg);
//});