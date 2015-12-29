/**
 * Created by James on 08/12/2015.
 */
var Vue = require("Vue");

var v = new Vue({
    el: '#data',
    data: {
        crawling: true,
        urls: [{
            u: 'example.com',
            found: 'false'
        }],
        functions: {
            pauseCrawl: function () {
            },
            resumeCrawl: function () {
            }
        },
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