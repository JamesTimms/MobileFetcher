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
 * Only supports http and https right now.
 *
 * @param url The url to test.
 * @param ua User agent for robots.txt specifics. Mostly * is ok.
 */
isAllowed = function (url, ua) {
    if (!url.match(/^https?:\/\//)) {
        url = "http://" + url;
    }
    return obeyRobotsTxt && robots.isAllowed(url, ua);
};

module.exports = isAllowed;
