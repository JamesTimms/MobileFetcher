'use strict';

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var data = require('./app/js/data-parser.js');
var dataParser = require('./app/js/data-parser.js');
var import_io = require('./app/js/import-io.js');
var config = require('./app/backend/config-loading.js');
const ipc = require('ipc');

// Report crashes to our server.
//require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 1260, height: 1080});

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});

//ipc.on('data-export', function(event, args) {
//    var dataP = dataParser.DataParser();
//    dataP.ParseData(args);
//});

ipc.on('data-contents', function (event, args) {
    BrowserWindow.fromWebContents(event.sender).close();
    if(!args) {
        console.log('No data from api request. The api request was probably formed wrong.');
        return;
    }
    mainWindow.webContents.send('import-io-data', args);
    var dataP = dataParser.DataParser();
    dataP.ParseData(args);
});

config.SetupJSONListeners();