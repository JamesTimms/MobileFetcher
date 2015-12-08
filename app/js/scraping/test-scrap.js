/**
 * Created by James on 08/12/2015.
 */

var Xray = require('x-ray');
var x = Xray();

x('http://google.com', 'title')(function(err, title) {
    if(err) {
        console.log('There was an error in the webscraper: ' + err);
        return;
    }
    console.log(title); // Google
    document.write(title);
});