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

//var allowedUrls = new RegExp([/.*/].join('|'));

var disallowedUrls = new RegExp([
    gsmarenaDomain + "a.gsmarena.com\/",
    httpsOpt + "facebook.com/",
    gsmarenaDomain + "?[a-zA-Z0-9_]+-(blog|3d-spin|pictures|reviews|review)-.*",
    gsmarenaDomain + "?(reviews|review|blog|compare|news|advert|privacy|" +
    "favicon|login|tools|faq|contact|switch|tipus|glossary|team|terms|" +
    "network-bands|postopinion|nickname|benchmark|search).*",
    httpsOpt + "plusone.google.com",
    gsmarenaDomain + "g;m.parentNode.insertBefore%28a,m%29",
    gsmarenaDomain + "3%22"
].join('|'));

module.exports = function (parsedURL) {
    return (!parsedURL.path.match(disallowedUrls));
    //|| parsedURL.path.match(allowedUrls);//Allow list should override the disallow list.
};