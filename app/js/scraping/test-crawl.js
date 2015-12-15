/**
 * Created by James on 08/12/2015.
 */

//var Crawler = require('js-crawler');
var Crawler = require("simplecrawler");
var Vue = require("Vue");

//-------------------------------------------------------VUE CODE-------------------------------------------------------
var v = new Vue({
    el: '#data',
    data: {
        crawling: true,
        urls: []
    }
});
//----------------------------------------------------------------------------------------------------------------------

//---------------------------------------------robots.txt---------------------------------------------------------------
/**
 * Created by James on 08/12/2015.
 */
var robotsParser = require('robots-parser');
//var request = require('request');

var obeyRobotsTxt = true;
//request('http://www.gsmarena.com/robots.txt', function(err, response, html) {
//    console.log(html);
//    //console.log(isAllowed("www.dfds.com"));
//    //console.log(isAllowed("www.gsmarena.com/postopinion.php3"));
//    //console.log(isAllowed("http://www.gsmarena.com/postcomment.php3"));
//    //console.log(isAllowed("www.gsmarena.com/forum/images/stuff"));
//    //console.log(isAllowed("http://www.gsmarena.com/new/stuff.php3"));
//    //console.log(isAllowed("http://www.gsmarena.com/nice-phone.php3"));
//});
var cachedGsmarenaRobotsTxt =
    'User-agent: *\n' +
    'Disallow: /postopinion.php3\n' +
    'Disallow: /postcomment.php3\n' +
    "Disallow: /postreviewcomment.php3\n" +
    "Disallow: /forum/images/\n" +
    "Disallow: /forum/groupcp.php\n" +
    "Disallow: /forum/login.php\n" +
    "Disallow: /forum/memberlist.php\n" +
    "Disallow: /forum/posting.php\n" +
    "Disallow: /forum/privmsg.php\n" +
    "Disallow: /forum/profile.php\n" +
    "Disallow: /forum/viewonline.php\n" +
    "Disallow: /strongpanasonic/\n" +
    "Disallow: /copy/\n" +
    "Disallow: /forums/\n" +
    "Disallow: /new/\n" +
    "Disallow: /apple/\n" +
    "Disallow: /swf/\n" +
    "Disallow: /a/\n" +
    "Disallow: /report.php3\n" +
    "\n" +
    "User - agent: Mediapartners - Google\n" +
    "Disallow:\n";

var robots = robotsParser('http://www.gsmarena.com/robots.txt', cachedGsmarenaRobotsTxt);

/**
 *
 * @param url The url to test.
 * @param ua User agent for robots.txt specifics. Mostly * is ok.
 */
isAllowed = function (url, ua) {
    if(!obeyRobotsTxt) {
        return false;
    }
    var r = robots.isAllowed(url, ua);
    return (r == undefined) ? false : r;
};
//----------------------------------------------------------------------------------------------------------------------

var httpsOpt = "^(https?:\/\/)?(www.)?";
var gsmarenaDomain = "(^(https?:\/\/)?(www.)?gsmarena.com\/)";

var allowedUrls = new RegExp([/.*/].join('|'));

var disallowedUrls = new RegExp([
    gsmarenaDomain + "a.gsmarena.com\/",
    httpsOpt + "facebook.com/",
    gsmarenaDomain + "?/[a-zA-Z0-9]+-(blog|3d-spin|pictures|reviews)-[a-zA-Z0-9]+",
    gsmarenaDomain + "?(reviews|blog|compare|news|advert|privacy|" +
    "favicon|login|tools|faq|contact|switch|tipus|glossary).*",
    httpsOpt + "plusone.google.com"
].join('|'));

var myCrawler = new Crawler("www.gsmarena.com", "/", 80);
myCrawler.maxDepth = 1;
myCrawler.maxConcurrency = 2;
myCrawler.interval = 1000;
//myCrawler.cache = new Crawler.cache('./cacheHere/cache');//TODO: Cache not working for some reason.

myCrawler.on("fetchcomplete", function (queueItem, responseBuffer, response) {
    //console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
    //console.log("It was a resource of type %s", response.headers['content-type']);
    extract(responseBuffer);
});

myCrawler.on("fetchstart", function () {
    console.log("Fetch started!");
});

myCrawler.on("complete", function () {
    console.log("Completed the crawl");
    console.log(myCrawler.queue);
    myCrawler.stop();
});

myCrawler.on("queueerror", function () {
    console.log("error with queue");
});
myCrawler.on("fetcherror", function () {
    console.log("error with fetch");
});
myCrawler.on("fetchdataerror", function () {
    console.log("error with fetch data");
});

myCrawler.on("queueadd", function (queuedItem) {
    v.$data.urls.push(queuedItem.url);
});

myCrawler.on("crawlstart", function () {
    console.log("Crawl Started!");
});

var conditionID = myCrawler.addFetchCondition(function (parsedURL) {
    return (!parsedURL.path.match(disallowedUrls) && isAllowed(parsedURL.protocol + "://" + parsedURL.host + parsedURL.path));
    //|| parsedURL.path.match(allowedUrls);//Allow list should override the disallow list.
});

process.nextTick(function () {
    myCrawler.start();
});

var pauseCrawl = function () {
    myCrawler.queue.freeze("crawledUrls.json", function (err) {
        console.log("FREEZE!");
        console.log("FREEZE error: " + err);
        //process.exit();
        myCrawler.stop();
        console.log(myCrawler.queue[0])
    });
    v.$data.crawling = false;
};

var resumeCrawl = function () {
    myCrawler.queue.defrost("crawledUrls.json");
    myCrawler.start();
    v.$data.crawling = true;
};
//-----------------------------------------------x-ray web reading------------------------------------------------------
var Xray = require('x-ray');

var x = Xray();

function isEmpty(object) {
    for(var key in object) {
        if(object.hasOwnProperty(key)){
            return false;
        }
    }
    return true;
}

//myCrawler.queue.
//#body > div > div.review-header.hreview > div > div.article-info-line.page-specs.light.border-bottom > h1
var extract = function(urlOrData) {
    x(urlOrData, {
        title: '#body > div > div.review-header.hreview > div > div.article-info-line.page-specs.light.border-bottom > h1',
        technology: '#specs-list > table:nth-child(3) > tr:nth-child(2) > td.nfo',
        //#specs-list > table:nth-child(2) > tbody > tr.tr-hover > td.nfo > a
        announced: '#specs-list > table:nth-child(4) > tr:nth-child(2) > td.nfo',
        //#specs-list > table:nth-child(3) > tbody > tr:nth-child(2) > td.nfo
        release: '#specs-list > table:nth-child(4) > tr:nth-child(1) > td.nfo'
        //#specs-list > table:nth-child(3) > tbody > tr:nth-child(1) > td.nfo
    })(function (err, found) {
        if (err) {
            console.log('There was an error in the webscraper: ' + err);
            return;
        }
        if (found === '' || isEmpty(found)) {
            console.log('Found nothing...');
            return;
        }
        console.info(found);
    });
};