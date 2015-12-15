/**
 * Created by James on 08/12/2015.
 */
var robotsParser = require('robots-parser');
var request = require('request');

var obeyRobotsTxt = true;
var isAllowed = function(){};
request('http://www.gsmarena.com/robots.txt', function(err, response, html) {
    console.log(html);
    var robots = robotsParser('http://www.gsmarena.com/robots.txt', html);

    /**
     * Only supports http and https right now.
     *
     * @param url The url to test.
     * @param ua User agent for robots.txt specifics. Mostly * is ok.
     */
    isAllowed = function(url, ua) {
        if(!url.match(/^https?:\/\//)) {
            url = "http://" + url;
        }
        return obeyRobotsTxt && robots.isAllowed(url, ua);
    };

    //console.log(isAllowed("www.dfds.com"));
    //console.log(isAllowed("www.gsmarena.com/postopinion.php3"));
    //console.log(isAllowed("http://www.gsmarena.com/postcomment.php3"));
    //console.log(isAllowed("www.gsmarena.com/forum/images/stuff"));
    //console.log(isAllowed("http://www.gsmarena.com/new/stuff.php3"));
    //console.log(isAllowed("http://www.gsmarena.com/nice-phone.php3"));
});

module.exports = isAllowed;
