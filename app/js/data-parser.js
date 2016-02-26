/**
 * Created by James on 30/11/2015.
 */
'use strict';

var fs = require('fs');
var csv = require('csv');

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
        fs.readFile(file, 'utf8', function (e, d) {
            //console.log(d);
            var _d = (d === '') ? {} : JSON.parse(d);
            //console.log(_d);
            _d[data['title']] = {
                MARKETING_NAME: data['title'],
                FORM_FACTOR: '',
                DEVICE_TYPE: '',
                NETWORK_TECH: data['network']['technology'],
                OS: data['platform']['OS'],
                UE_CATEGORY: '',
                IPV6_FLAT: '',
                VoWFi_FLAG: '',
                VoLTE_FLAG: '',
                SCREEN_SIZE: data['display']['resolution'],//Might need to review this value. More data available here.
                LAUNCH_DATE: data['launch']['status'],
                MAX_SPEED: data['technology'],//Will need to do some inference here. Regex to find strings etc...
                CHIPSET: ''
            };
            fs.writeFile(file, JSON.stringify(_d), [], callback);
        });
        //var csv_data = [["MARKETING_NAME", "FORM_FACTOR"], [data['title'], '']];

        //csv.generate({seed: 1, columns: 2, length: 20}, function(err, data){
        //    csv.parse(data, function(err, data){
        //        console.log(data);
        //
        //    });
        //});
        //console.log(csv_data);
        //csv.stringify(csv_data, function (err, data) {
        //    fs.appendFile(file + ".csv", data, [], callback);
        //});
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