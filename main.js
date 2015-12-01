'use strict';

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var data = require('./app/js/data-parser.js');
var dataParser = require('./app/js/data-parser.js');
var fs = require('fs');

// Report crashes to our server.
require('crash-reporter').start();
const ipc = require('ipc');
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
    mainWindow = new BrowserWindow({width: 800, height: 600});

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

ipc.on('get-data', function (event, args) {
    var dataP = dataParser.DataParser(args);
    dataP.test();
});

var ParseJsonFromFile = function (name) {
    return JSON.parse(fs.readFileSync(name));
};

ParseJsonFromFile('./import_io.json');

ipc.on('get_api_key', function (event) {
    var content = ParseJsonFromFile('./import_io.json');
    event.returnValue = content['import.io']['api_key'];
});

ipc.on('get_user', function (event) {
    var content = ParseJsonFromFile('./import_io.json');
    event.returnValue = content['import.io']['user'];
});

ipc.on('get_connector', function (event) {
    var content = ParseJsonFromFile('./import_io.json');
    console.info(content['import.io']['connector']);
    event.returnValue = content['import.io']['connector'];
});