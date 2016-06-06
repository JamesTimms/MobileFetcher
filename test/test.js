var assert = require('assert');
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
        });
    });
});
describe('HELLO WORLD', function() {
    describe('Basic example', function() {
        it('should say hello world', function() {
            assert.equal('hello world', "hello world");
            assert.equal('hello world', "HELLO WORLD".toLowerCase());
        });
    });
});
var r = require('../app/backend/scraping/test-robots.js');
describe('testing Robots', function() {
    describe('Check the object exists.', function() {
        it('should return robot oject', function() {
            var _r = new r.r('http://www.fake.com',
                'User-agent: *\n' +
                'Disallow: /\n');
            assert.equal(typeof _r, 'object');
            assert.equal('hi', 'hi');
        });
    });
});
describe('testing regex', function() {
    describe('testing filter for web scraper', function() {
        it('should be false', function() {
            var results = !'http://www.gsmarena.com/alcatel-phones-f-5-0-p5.php'.match(new RegExp("(^(https?:\/\/)?(www.)?gsmarena.com\/).*-phones-f-.*-.*-p.*"));
            assert.equal(results, false);
        });
    });
});
