var assert = require('assert');
describe('Array', function() {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});
describe('HELLO WORLD', function() {
    describe('Basic example', function () {
        it('should say hello world', function () {
            assert.equal('hello world', "hello world");
            assert.equal('hello world', "HELLO WORLD".toLowerCase());
        });
    });
});
