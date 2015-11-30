/**
 * Created by James on 16/11/2015.
 */
'use strict';

var ipc = require('ipc');

//ipc.send('get-data', document.body);

//ipc.on('request-web-contents', function(event){
//    event.returnValue = 'returned!';
//});

document.write("\<webview id=\"data_page\" preload=\"./data-fetcher.js\" src=\""
    + 'file://' + __dirname + '/data.html'
    + "\" style=\"display:inline-block; width:640px; height:480px\" nodeintegration\>\</webview\>");

onload = function() {
    var webview = document.getElementById('data_page');
    var loadstop = function() {
        var js = "var ipc = require('ipc'); ipc.send('get-data', document.body.innerText);";
        webview.executeJavaScript(js, false);
    };

    webview.addEventListener("did-stop-loading", loadstop);
};