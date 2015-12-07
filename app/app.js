/**
 * Created by James on 16/11/2015.
 */
'use strict';

var ipc = require('ipc');

/**
 * @return {string}
 */
var ImportIoQuery = function (gsmarenaUrl) {
    return "https://api.import.io/store/data/"
        + ipc.sendSync("get_connector")
        + "/_query?"
        + "input/webpage/url=" + gsmarenaUrl
        + "&_user=" + ipc.sendSync("get_user")
        + "&_apikey=" + ipc.sendSync("get_api_key");
};

//https://api.import.io/store/connector/2df02e8d-d412-4274-a0d7-fe481396c7c4/_query?input/webpage/url=http://www.gsmarena.com/samsung_galaxy_s6-6849.php&_apikey=186162e22a0d453e9ede29865d3e39387de2649926ef6d4d8670251f57d3a7ed7669b57c45bc91d478fd61e2d2b0282bd5aa5a9a697b45b2eb761bdb03182ce4769cce1753e688a5f00a83df77657d20

//document.write("\<webview id=\"data_page\" src=\"" + ImportIoQuery()
//    + "\" style=\"display:inline-block; width:640px; height:480px\" nodeintegration\>\</webview\>");

//onload = function() {
//    var webview = document.getElementById('data_page');
//    var loadstop = function() {
//        var js = "var ipc = require('ipc'); ipc.send('get-data', document.body.innerText);";
//        webview.executeJavaScript(js, false);
//    };
//    webview.addEventListener("did-stop-loading", loadstop);
//};

var LoadData = function () {
    var url = document.getElementById('data-url').value;

    var reg = /^(http:\/\/)?www.gsmarena.com\//i;
    if(reg.exec(url) === null) {
        console.log('url is invalid. needs to be http://www.gsmarena.com/[device_page]');
        return;
    }
    console.log(ImportIoQuery(url));
    ipc.send('get-data', ImportIoQuery(url));
};

document.getElementById('data-button').onclick = LoadData;

ipc.on('import-io-data', function (arg) {
    console.log(arg);
});