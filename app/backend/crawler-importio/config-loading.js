/**
 * Created by James on 01/12/2015.
 */
var fs = require('fs');
const ipc = require('ipc');

var ParseJsonFromFile = function (name) {
    return JSON.parse(fs.readFileSync(name));
};

var SetupJSONListeners = function() {
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
        event.returnValue = content['import.io']['connector'];
    });
};

exports.ParseJsonFromFile = ParseJsonFromFile;
exports.SetupJSONListeners = SetupJSONListeners;