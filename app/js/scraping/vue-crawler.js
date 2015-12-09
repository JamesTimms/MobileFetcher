/**
 * Created by James on 09/12/2015.
 */

var Vue = require("Vue");

var v = new Vue({
    el: '#data',
    data: {
        urls: ['www.example.com','www.example2.com']
    }
});
console.info(v.$data.urls);
v.$data.urls.push('test.com');
v.$data.urls.push('test2.com');

//exports.v = v;