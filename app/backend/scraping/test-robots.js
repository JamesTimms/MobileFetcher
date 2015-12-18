/**
 * Created by James on 08/12/2015.
 */
var robotsParser = require('robots-parser');
var request = require('request');

function RobotsTxt(url, contents) {
    this.r = robotsParser(url, contents);
    this.hi = 'hi'
    this.fun = function () {
    };
    this.isAllowed = function () {
        var robotRules = this;
        return function (parsedURL) {
            var _r = robotRules.isAllowed(parsedURL.protocol + "://" + parsedURL.host + parsedURL.path);
            return (_r == undefined) ? false : _r;
        };
    };
}

/**
 * Just a cache of Gsmarena's robots.txt file. TODO: Should move this to business logic.
 * @type {string}
 */
module.exports.cachedGsmarenaRobotsTxt =
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

/**
 * Full example:
 * getRobotsFor(url, function(err, response, html) {var rules = forRobotsOn(url, html)})
 * @param robotTxtUrl The url of where the robots.txt file is located 'http://www.example.com/robots.txt'
 * @param callback Example:
 * getRobotsFor('http://www.example.com/robots.txt', function (err, response, html) {//handle raw response.});
 */
//RobotsTxt.getRobotsFor = function (robotTxtUrl, callback) {
//    request(robotTxtUrl, callback);
//};

module.exports.r = RobotsTxt;