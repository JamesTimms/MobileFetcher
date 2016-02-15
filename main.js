'use strict';

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
const ipc = require('ipc');
var mobileFetcher = require('./app/backend/mobileFetcher/mobileFetcher.js');
var dataParser = require('./app/js/data-parser.js');
//var databaseORM = require('./app/models/sequelizeInit.js');

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
    mainWindow.loadUrl('file://' + __dirname + '/app/data.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    new mobileFetcher(mainWindow.webContents);
});

//databaseORM();//FIXME: Can't get sqlite3 working with sequilize due to sqlite3, electron & node-gyp issues.

// Error handling & logging for otherwise unhandled errors
process.on('uncaughtException', function (e) {
    console.log(new Date().toString(), e.stack || e);
    var d = new Date();
    dataParser.logError('logs-' + d.getYear() + '-' + d.getMonth() + '-' + d.getDay()
        + '.txt', e.stack || e);
});