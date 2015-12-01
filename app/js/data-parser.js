/**
 * Created by James on 30/11/2015.
 */
'use strict';

var DataParser = function (data) {
    var func = {};
    var data = data;
    func.test = function () {
        console.log('test-class');
    };

    return func;
};
exports.DataParser = DataParser;