/**
 * Created by James on 17/12/2015.
 */

/**
 *
 * @param url The url to test.
 * @param ua User agent for robots.txt specifics. Mostly * is ok.
 */

var httpsOpt = "^(https?:\/\/)?(www.)?";
var gsmarenaDomain = "(^(https?:\/\/)?(www.)?gsmarena.com\/)";
var obeyRobotsTxt = true;

//var allowedUrls = new RegExp([/.*/].join('|'));

var disallowedUrls = new RegExp([
    gsmarenaDomain + "a.gsmarena.com\/",
    httpsOpt + "facebook.com/",
    gsmarenaDomain + "?/[a-zA-Z0-9]+-(blog|3d-spin|pictures|reviews)-[a-zA-Z0-9]+",
    gsmarenaDomain + "?(reviews|blog|compare|news|advert|privacy|" +
    "favicon|login|tools|faq|contact|switch|tipus|glossary).*",
    httpsOpt + "plusone.google.com"
].join('|'));

var isAllowed = function (url, ua) {
    if (!obeyRobotsTxt) {
        return false;
    }
    var r = robotRules.isAllowed(url, ua);
    return (r == undefined) ? false : r;
};

module.exports = function (parsedURL) {
    return (!parsedURL.path.match(disallowedUrls) && isAllowed(parsedURL.protocol + "://" + parsedURL.host + parsedURL.path));
    //|| parsedURL.path.match(allowedUrls);//Allow list should override the disallow list.
};