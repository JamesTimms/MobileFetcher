/**
 * Created by James on 08/12/2015.
 */

var Xray = require('x-ray');
var x = Xray();

//#body > div > div.review-header.hreview > div > div.article-info-line.page-specs.light.border-bottom > h1
x('http://www.gsmarena.com/samsung_galaxy_s6-6849.php', {
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
    if (found === '') {
        console.log('Found nothing...');
        return;
    }
    console.info(found);//Google
    document.write(found.technology);
});