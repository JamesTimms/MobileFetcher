/**
 * Created by James on 08/12/2015.
 */
var Crawler = require("simplecrawler");
var filters = require('./rules.js');
var websiteRules = require('../scraping/test-robots.js'); //TODO: Make interface.
//var extract = require('../Extractor/simple-extractor.js');

function GsmarenaCrawler() {
    this.c = new Crawler("www.gsmarena.com", "/makers.php3", 80);
    // this.c = new Crawler("www.gsmarena.com", "/samsung_galaxy_s6-6849.php", 80);
    this.c.maxDepth = 4;
    this.c.maxConcurrency = 1;
    this.c.interval = 1000;
    this.c.decodeResponses = true;
    //this.c.cache = new Crawler.cache('./gsmArenaCache');//TODO: Simple-crawler's cache is broken right now...

    //-----------------------------------------------rules-----------------------------------------------------//
    var robotRules = new websiteRules.r('http://www.gsmarena.com/robots.txt', websiteRules.cachedGsmarenaRobotsTxt);
    this.addFetchCondition(filters);
    this.addFetchCondition(robotRules.isAllowed());
    //---------------------------------------------------------------------------------------------------------//

    // this.c.on("fetchstart", function (queueItem, requestOptions) {
    // console.log("Queue Started!");
    // });

    this.c.on("complete", function() {
        console.log("Finished crawl!");
        this.c.stop();
    }.bind(this));

    // this.c.on("queueerror", function (errorData, URLData) {
    // console.log("error with queue");
    // });
    this.c.on("fetcherror", function(queueItem, response) {
        console.log("error with fetch: " + queueItem);
    });
    this.c.on("fetchdataerror", function(queueItem, response) {
        console.log("error with fetch data: " + queueItem);
    });

    this.c.on("crawlstart", function() {
        console.log("Crawl Started!");
    });

}

GsmarenaCrawler.prototype.start = function() {
    process.nextTick(function() {
        this.c.start();
    }.bind(this));
};

GsmarenaCrawler.prototype.buildPause = function() {
    var _c = this.c;
    return function() {
        _c.queue.freeze("crawledUrls.json", function(err) {
            if (err) {
                console.log("FREEZE error: " + err);
            }
            _c.stop();
        });
    }
};

GsmarenaCrawler.prototype.buildResume = function() {
    var _c = this.c;
    return function() {
        _c.queue.defrost("crawledUrls.json");
        _c.start();
    };
};

/**
 *
 * @param shouldCrawl
 * return the id for the fetch condition.
 */
GsmarenaCrawler.prototype.addFetchCondition = function(shouldCrawl) {
    return this.c.addFetchCondition(shouldCrawl);
};

module.exports = GsmarenaCrawler;
