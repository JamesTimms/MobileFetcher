/**
 * Created by James on 16/11/2015.
 */
'use strict';

var ipc = require('ipc');

/**
 * @return {string}
 */
var ImportIoQuery = function(){
    return "https://api.import.io/store/data/"
        + ipc.sendSync("get_connector")
        + "/_query?_user=" + ipc.sendSync("get_user")
        + "&_apikey=" + ipc.sendSync("get_api_key");
};

//document.write("\<webview id=\"data_page\" src=\"" + ImportIoQuery()
//    + "\" style=\"display:inline-block; width:640px; height:480px\" nodeintegration\>\</webview\>");
//
//onload = function() {
//    var webview = document.getElementById('data_page');
//    var loadstop = function() {
//        var js = "var ipc = require('ipc'); ipc.send('get-data', document.body.innerText);";
//        webview.executeJavaScript(js, false);
//    };
//
//    webview.addEventListener("did-stop-loading", loadstop);
//};