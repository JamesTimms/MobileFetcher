/**
 * Created by James on 17/12/2015.
 */

var webToMachine = require('../scraping/test-scrap.js');//TODO: Make interface.
var rules = require('../scraping/test-robots.js');//TODO: Make interface.
var GsmarenaCrawler = require('../scraping/test-crawl.js');//TODO: Make interface.
var OtherRules = require('./rules.js');

var getGsmarenaDataFrom = function (callback, urlOrData) {
    webToMachine.extract(urlOrData, callback);
};

ipc.on('x-ray', function (event, urlOrData) {
    mobileFetcher.getGsmarenaDataFrom(urlOrData, function (found) {
        event.sender.send('results', found);
    });
});

var robotRules = rules.forRobotsOn('http://www.gsmarena.com/robots.txt', rules.cachedGsmarenaRobotsTxt);

var crawler = new GsmarenaCrawler();
crawler.addFetchCondition(OtherRules);

module.exports.getGsmarenaDataFrom = getGsmarenaDataFrom;