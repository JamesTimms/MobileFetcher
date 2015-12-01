/**
 * Created by James on 30/11/2015.
 */
'use strict';

var fs = require('fs');

var DataParser = function () {
    var func = {};
    func.ParseData = function (data) {
        var json = JSON.parse(data);
        var _json = [];
        _json.push({
            name: json['results'][0]['name_of_phone'],
            data: json['results']
        });
        fs.writeFile('./test_data.json', JSON.stringify(_json), [], function () {
            console.log('finished writing to file')
        })
    };

    return func;
};
exports.DataParser = DataParser;