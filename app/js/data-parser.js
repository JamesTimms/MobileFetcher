/**
 * Created by James on 30/11/2015.
 */
'use strict';

var fs = require('fs');

var DataParser = function (file, data, callback) {
    //if (isArray(data)) {
    //    data.forEach(function (_d) {
    //        deviceDataToFile(file, _d)
    //    })
    //} else {
    //    deviceDataToFile(file, data);
    //}
    deviceDataToFile(file, data, callback);
};

var deviceDataToFile = function (file, data, callback) {
    if (!data) {
        console.log('Failed to write to file because there was no data.');
        return;
    }

    try {
        //var json = JSON.parse(data);
        var _json = [];
        _json = data;
        //_json.push({
        //    name: data['results'][0]['name_of_phone'],
        //    data: data['results']
        //});
        fs.writeFile(file, JSON.stringify(_json), [], callback);
        console.log('end of parsing.');
    } catch (ex) {
        console.log("Failed to write JSON to file due to... " + ex);
    }
};

var logError = function (file, data) {
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