/**
 * Created by James on 16/11/2015.
 */
'use strict';

var ipc = require('ipc');

//ipc.send('get-data', document.body);

//ipc.on('request-web-contents', function(event){
//    event.returnValue = 'returned!';
//});

document.write(" \<webview id=\"data_page\" src=\"" + 'file://' + __dirname + '/data.html' + "\" style=\"display:inline-block; width:640px; height:480px\"\>\</webview\>");

onload = function() {
    console.log('onload...');
    var webview = document.getElementById("data_page");

    var loadstart = function() {
        indicator.innerText = "loading...";
    };
    var loadstop = function() {
        var htmlContent = webview.innerHTML;
        console.log(htmlContent);
    };

    webview.addEventListener("did-start-loading", loadstart);
    webview.addEventListener("did-stop-loading", loadstop);
};