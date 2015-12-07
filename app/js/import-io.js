/**
 * Created by James on 03/12/2015.
 */
'use strict';

var ipc = require('ipc');
var BrowserWindow = require('browser-window');

ipc.on('get-data', function (event, args) {
    getDataFrom(args);
});

var getDataFrom = function (url) {
    var dataWindow = new BrowserWindow({width: 860, height: 640, show: true});
    dataWindow.loadUrl(url);
    dataWindow.webContents.on('did-finish-load', function () {
        var js = "var ipc = require('ipc'); ipc.send('data-contents', document.body.innerText);";
        dataWindow.webContents.executeJavaScript(js);
    });
};