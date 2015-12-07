/**
 * Created by James on 30/11/2015.
 */
'use strict';

var fs = require('fs');

var DataParser = function () {
    var func = {};
    func.ParseData = function (data) {
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
            fs.writeFile('../storage/test_data.json', JSON.stringify(_json), [], function () {
                console.log('finished writing to file')
            })
        } catch (ex) {
            console.log("Failed to write JSON to file due to... " + ex);
        }
    };

    return func;
};
exports.DataParser = DataParser;