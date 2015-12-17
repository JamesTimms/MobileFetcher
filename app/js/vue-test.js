/**
 * Created by James on 08/12/2015.
 */
var Vue = require("Vue");

var v = new Vue({
    el: '#app',
    data: {
        crawling: true,
        urls: [],
        devices: [
            {
                name: 'iPhone6',
                ipv6: 'yes'
            },
            {
                name: 'Samsung S6',
                ipv6: 'yes'
            },
            {
                name: 'EE Harrior',
                ipv6: '?'
            }
        ]
    }
});
module.exports = v;