/**
 * Created by James on 30/11/2015.
 */
'use strict';

var fs = require('fs');

var DataParser = function (data) {
    if (isArray(data)) {
        data.forEach(function (_d) {
            writeToFile(_d)
        })
    } else {
        writeToFile(data);
    }
};

var writeToFile = function () {
    if (!data) {
        console.log('Failed to write to file because data was null.');
        return;
    }

    try {
        var json = JSON.parse(data);
        var _json = [];
        _json.push({
            name: json['results'][0]['name_of_phone'],
            data: json['results']
        });
        fs.appendFile('../storage/test_data.json', JSON.stringify(_json), [], function () {
            console.log('finished writing to file')
        })
    } catch (ex) {
        console.log("Failed to write JSON to file due to... " + ex);
    }
};
exports.DataParser = DataParser;