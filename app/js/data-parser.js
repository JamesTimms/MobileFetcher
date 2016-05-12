/**
 * Created by James on 30/11/2015.
 */
'use strict';
//
var fs = require('fs');
var csv = require('csv-write-stream');
var csvExporter = '',
    fileWriteStream = '';

function DataParser(file, callback) {
    //TODO: Add support for JSON exporter.
    csvExporter = csv();
    fileWriteStream = fs.createWriteStream(file);
    if (callback) {
        fileWriteStream.on('close', callback);
    };
    /* Need callback on WriteStream instead of CSV so the close event
     * is fired after file has finished been written too.
     */
    csvExporter.pipe(fileWriteStream);
}

var translateDataFields = function(data) {
    var _d = {};
    _d[data['title']] = {
        MARKETING_NAME: data['title'],
        FORM_FACTOR: '',
        DEVICE_TYPE: '',
        NETWORK_TECH: data['network']['technology'],
        OS: data['platform']['OS'],
        UE_CATEGORY: '',
        IPV6_FLAG: '',
        VoWFi_FLAG: '',
        VoLTE_FLAG: '',
        SCREEN_SIZE: data['display']['resolution'], //Might need to review this value. More data available here.
        LAUNCH_DATE: data['launch']['status'],
        MAX_SPEED: data['technology'], //Will need to do some inference here. Regex to find strings etc...
        CHIPSET: ''
    };
    return _d;
}

var translateDataFieldsCSV = function(data) {
    var _d = {
        MARKETING_NAME: data['title'],
        FORM_FACTOR: '',
        DEVICE_TYPE: '',
        NETWORK_TECH: data['network']['technology'],
        OS: data['platform']['OS'],
        UE_CATEGORY: '',
        IPV6_FLAG: '',
        VoWFi_FLAG: '',
        VoLTE_FLAG: '',
        SCREEN_SIZE: data['display']['resolution'], //Might need to review this value. More data available here.
        LAUNCH_DATE: data['launch']['status'],
        MAX_SPEED: data['technology'], //Will need to do some inference here. Regex to find strings etc...
        CHIPSET: ''
    };
    return _d;
}

DataParser.prototype.write = function(data) {
    if (csvExporter == '') {
        console.log('File stream is closed. Cannot write to file.');
        return;
    }
    if (!data) {
        console.log('Failed to write to file because there was no data.');
        return;
    }

    try {
        var _d = translateDataFieldsCSV(data);
        csvExporter.write(_d, 'utf8');
    } catch (ex) {
        console.log("Failed to write JSON to file due to... " + ex);
    }
}

DataParser.prototype.deviceDataToFile = function(data) {
    this.write(data);
};

DataParser.prototype.end = function(data) {
    if (data) {
        csvExporter.end(translateDataFieldsCSV(data));
    } else {
        csvExporter.end();
    }
    csvExporter = '';
}

var logError = function(file, data) {
    if (!data) {
        console.log('Failed to write to file because data was null.');
        return;
    }

    try {
        if (!fs.existsSync('./app/storage/logs/')) {
            fs.mkdirSync('./app/storage/logs');
        }
        fs.appendFile('./app/storage/logs/' + file, data);
    } catch (ex) {
        console.log("Error logging failed due to: " + ex);
    }
};

module.exports = DataParser;
module.exports.logError = logError;
module.exports.translateDataFields = translateDataFields;
module.exports.translateDataFieldsCSV = translateDataFieldsCSV;
