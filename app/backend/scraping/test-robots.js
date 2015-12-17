/**
 * Created by James on 08/12/2015.
 */
var robotsParser = require('robots-parser');
var request = require('request');

/**
 * Full example:
 * getRobotsFor(url, function(err, response, html) {var rules = forRobotsOn(url, html)})
 * @param robotTxtUrl The url of where the robots.txt file is located 'http://www.example.com/robots.txt'
 * @param callback Example:
 * getRobotsFor('http://www.example.com/robots.txt', function (err, response, html) {//handle raw response.});
 */
var getRobotsFor = function (robotTxtUrl, callback) {
    request(robotTxtUrl, callback);
};
/**
 * Just a cache of Gsmarena's robots.txt file. TODO: Should move this to business logic.
 * @type {string}
 */
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

var forRobotsOn = function(url, contents){
    return robotsParser(url, contents);
};

module.exports.getRobotsFor = getRobotsFor;
module.exports.cachedGsmarenaRobotsTxt = cachedGsmarenaRobotsTxt;
module.exports.forRobotsOn = forRobotsOn;