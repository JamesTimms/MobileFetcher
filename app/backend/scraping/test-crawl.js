/**
 * Created by James on 08/12/2015.
 */
var ipc = require('ipc');
var Crawler = require("simplecrawler");

function GsmarenaCrawler() {
    this.c = new Crawler("www.gsmarena.com", "/", 80);
    this.c.maxDepth = 1;
    this.c.maxConcurrency = 2;
    this.c.interval = 1000;
    //c.cache = new Crawler.cache('./cacheHere/cache');//TODO: Cache not working for some reason.

    var setupCrawler = function () {
        this.c.on("fetchcomplete", function (queueItem, responseBuffer, response) {
            //console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
            //console.log("It was a resource of type %s", response.headers['content-type']);
            extract(responseBuffer);
        });

        this.c.on("fetchstart", function (queueItem, requestOptions) {
            console.log("Fetch started!");
        });

        this.c.on("complete", function () {
            console.log("Completed the crawl");
            console.log(this.c.queue);
            this.c.stop();
            //c.queue.forEach(function (webpage) {
            //        extract(webpage.protocol + "://" + webpage.host + webpage.url);
            //    }
            //)
        }.bind(this));

        this.c.on("queueerror", function (errorData, URLData) {
            console.log("error with queue");
        });
        this.c.on("fetcherror", function (queueItem, response) {
            console.log("error with fetch");
        });
        this.c.on("fetchdataerror", function (queueItem, response) {
            console.log("error with fetch data");
        });

        this.c.on("queueadd", function (queuedItem) {
            v.$data.urls.push(queuedItem.url);
        });

        this.c.on("crawlstart", function () {
            console.log("Crawl Started!");
        });
    }.bind(this);

    var setupCrawlerFreeze = function () {
        var pauseCrawl = function () {
            this.c.queue.freeze("crawledUrls.json", function (err) {
                console.log("FREEZE!");
                console.log("FREEZE error: " + err);

                this.c.stop();
                console.log(this.c.queue[0])
            }.bind(this));
        }.bind(this);

        var resumeCrawl = function () {
            this.c.queue.defrost("crawledUrls.json");
            this.c.start();
        }.bind(this);
    }.bind(this);
    setupCrawler();
    setupCrawlerFreeze();
}

//method
GsmarenaCrawler.prototype.start = function () {
    process.nextTick(function () {
        this.c.start();
    }.bind(this));
};
/**
 *
 * @param shouldCrawl
 * return the id for the fetch condition.
 */
GsmarenaCrawler.prototype.addFetchCondition = function (shouldCrawl) {
    return this.c.addFetchCondition(shouldCrawl);
};

//static method
GsmarenaCrawler.sayHelloAll = function () {
    return 'Hello everyone!';
};

module.exports = GsmarenaCrawler;