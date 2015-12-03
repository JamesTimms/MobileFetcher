/**
 * Created by James on 03/12/2015.
 */

onload = function() {
    var webview = document.getElementById('data_page');
    var loadstop = function() {
        var js = "var ipc = require('ipc'); ipc.send('get-data', document.body.innerText);";
        webview.executeJavaScript(js, false);
    };
    webview.addEventListener("did-stop-loading", loadstop);
};

var doTheMagic = function (url) {

};

exports.magic = doTheMagic();