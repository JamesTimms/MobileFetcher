var assert = require('assert');
var extractor = require('../app/backend/Extractor/simple-extractor.js');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

//Note: For some reason when downloading html page from gsmarena directly it is different to the html obtained from a
//request or xray (which uses request) download. xray(webpageURL) is different to xray(localCopy).
describe('testing extractor on gsmarena', function () {
    describe('galaxy-s6', function () {
        it('should extract all the data fields', function (done) {
            var localWebpage = fs.readFileSync('./test/gsmarena-cache/Samsung Galaxy S6 - Full phone specifications.html');
            var cheerioObject = cheerio.load(localWebpage);
            extractor(cheerioObject.html(), function (found) {
                console.info(found);
                assert.equal('Samsung Galaxy S6', found['title'], 'title failed');
                assert.equal('GSM / HSPA / LTE', found['network']['technology'], 'technology failed');
                assert.equal('GSM 850 / 900 / 1800 / 1900', found['network']['_2g'], '_2g failed');
                assert.equal('HSDPA 850 / 900 / 1900 / 2100'
                    + 'HSDPA 850 / 900 / 1700 / 1900 / 2100 - G920T'
                    + ' - G920A', found['network']['_3g'] + found['network']['_3g_2'] + found['network']['_3g_3'], '_3g failed');
                //assert.equal("'LTE band 1(2100), 2(1900), 3(1800), 4(1700/2100), 5(850), 7(2600), 8(900),\r\n" +
                //    "                                12(700), 17(700), 18(800), 19(800), 20(800), 26(850) - G920F\r\n                            ',"
                //    , found['_4g'], '_4g failed');
                assert.equal('HSPA 42.2/5.76 Mbps, LTE Cat6 300/50 Mbps', found['network']['speed'], 'speed failed');
                assert.equal('Yes', found['network']['gprs'], 'gprs failed');
                assert.equal('Yes', found['network']['edge'], 'edge failed');
                assert.equal('2015, March', found['launch']['announced'], 'release failed');
                assert.equal('Available. Released 2015, April', found['launch']['status'], 'accouned failed');
                //assert.equal('', found['']);
                done();
            });
        });
    });
});