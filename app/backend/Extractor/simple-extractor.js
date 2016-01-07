/**
 * Created by James on 08/12/2015.
 */
var Xray = require('x-ray');

var x = Xray();

function isEmpty(object) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

var extract = function (urlOrData, callback) {
    if (urlOrData == null || urlOrData === 'undefined') {
        return;
    }
    try {
        x(urlOrData, {
            title: '#body > div > div.review-header.hreview > div > div.article-info-line.page-specs.light.border-bottom > h1',
            network: {
                technology: '#specs-list > table:nth-child(3) > tr.tr-hover > td.nfo > a',
                _2g: '#specs-list > table:nth-child(3) > tr:nth-child(2) > td.nfo',
                _3g: '#specs-list > table:nth-child(3) > tr:nth-child(3) > td.nfo',
                _3g_2: '#specs-list > table:nth-child(3) > tr:nth-child(4) > td.nfo',
                _3g_3: '#specs-list > table:nth-child(3) > tr:nth-child(5) > td.nfo',
                _4g: '#specs-list > table:nth-child(3) > tr:nth-child(6) > td.nfo',
                _4g_2: '#specs-list > table:nth-child(3) > tr:nth-child(7) > td.nfo',
                _4g_3: '#specs-list > table:nth-child(3) > tr:nth-child(8) > td.nfo',
                speed: '#specs-list > table:nth-child(3) > tr:nth-child(9) > td.nfo',
                gprs: '#specs-list > table:nth-child(3) > tr:nth-child(10) > td.nfo',
                edge: '#specs-list > table:nth-child(3) > tr:nth-child(11) > td.nfo'
            },
            launch: {
                announced: '#specs-list > table:nth-child(4) > tr:nth-child(1) > td.nfo',
                status: '#specs-list > table:nth-child(4) > tr:nth-child(2) > td.nfo'
            },
            body: {
                Dimensions: '#specs-list > table:nth-child(5) > tr:nth-child(1) > td.nfo',
                Weight: '#specs-list > table:nth-child(5) > tr:nth-child(2) > td.nfo',
                Build: '#specs-list > table:nth-child(5) > tr:nth-child(3) > td.nfo',
                Sim: '#specs-list > table:nth-child(5) > tr:nth-child(4) > td.nfo',
                Sim_2: '#specs-list > table:nth-child(5) > tr:nth-child(5) > td.nfo'

            },
            display: {
                type: '#specs-list > table:nth-child(6) > tr:nth-child(1) > td.nfo',
                size: '#specs-list > table:nth-child(6) > tr:nth-child(2) > td.nfo',
                resolution: '#specs-list > table:nth-child(6) > tr:nth-child(3) > td.nfo',
                multitouch: '#specs-list > table:nth-child(6) > tr:nth-child(4) > td.nfo',
                protection: '#specs-list > table:nth-child(6) > tr:nth-child(5) > td.nfo',
                protection_2: '#specs-list > table:nth-child(6) > tr:nth-child(6) > td.nfo'
            },
            platform: {
                OS: '#specs-list > table:nth-child(7) > tr:nth-child(1) > td.nfo',
                chipset: '#specs-list > table:nth-child(7) > tr:nth-child(2) > td.nfo',
                cpu: '#specs-list > table:nth-child(7) > tr:nth-child(3) > td.nfo',
                gpu: '#specs-list > table:nth-child(7) > tr:nth-child(4) > td.nfo'
            },
            memory: {
                cardslot: '#specs-list > table:nth-child(8) > tr:nth-child(1) > td.nfo',
                internal: '#specs-list > table:nth-child(8) > tr:nth-child(2) > td.nfo'
            },
            camera: {
                primary: '#specs-list > table:nth-child(9) > tr:nth-child(1) > td.nfo',
                features: '#specs-list > table:nth-child(9) > tr:nth-child(2) > td.nfo',
                features_2: '#specs-list > table:nth-child(9) > tr:nth-child(3) > td.nfo',
                video: '#specs-list > table:nth-child(9) > tr:nth-child(4) > td.nfo',
                secondary: '#specs-list > table:nth-child(9) > tr:nth-child(5) > td.nfo'
            },
            sound: {
                speaker_types: '#specs-list > table:nth-child(10) > tr:nth-child(1) > td.nfo',
                loudspeaker: '#specs-list > table:nth-child(10) > tr:nth-child(2) > td.nfo',
                _3_5mm_jack: '#specs-list > table:nth-child(10) > tr:nth-child(3) > td.nfo'
            },
            comms: {
                wlan: '#specs-list > table:nth-child(11) > tr:nth-child(1) > td.nfo',
                bluetooth: '#specs-list > table:nth-child(11) > tr:nth-child(2) > td.nfo',
                gps: '#specs-list > table:nth-child(11) > tr:nth-child(3) > td.nfo',
                nfc: '#specs-list > table:nth-child(11) > tr:nth-child(4) > td.nfo',
                infrared_port: '#specs-list > table:nth-child(11) > tr:nth-child(5) > td.nfo',
                radio: '#specs-list > table:nth-child(11) > tr:nth-child(6) > td.nfo',
                usb: '#specs-list > table:nth-child(11) > tr:nth-child(7) > td.nfo'
            },
            features: {
                sensors: '#specs-list > table:nth-child(12) > tr:nth-child(1) > td.nfo',
                messaging: '#specs-list > table:nth-child(12) > tr:nth-child(2) > td.nfo',
                browser: '#specs-list > table:nth-child(12) > tr:nth-child(3) > td.nfo',
                Java: '#specs-list > table:nth-child(12) > tr:nth-child(4) > td.nfo',
                misc: '#specs-list > table:nth-child(12) > tr:nth-child(5) > td.nfo'
            },
            battery: {
                battery: '#specs-list > table:nth-child(13) > tr:nth-child(1) > td.nfo',
                stand_by: '#specs-list > table:nth-child(13) > tr:nth-child(2) > td.nfo',
                talk_time: '#specs-list > table:nth-child(13) > tr:nth-child(3) > td.nfo',
                music_play: '#specs-list > table:nth-child(13) > tr:nth-child(4) > td.nfo'
            },
            misc: {
                colours: '#specs-list > table:nth-child(14) > tr:nth-child(1) > td.nfo',
                SAR_us: '#specs-list > table:nth-child(14) > tr:nth-child(2) > td.nfo',
                SAR_eu: '#specs-list > table:nth-child(14) > tr:nth-child(3) > td.nfo',
                price_group: '#specs-list > table:nth-child(14) > tr:nth-child(4) > td.nfo'
            },
            tests: {
                performance: '#specs-list > table:nth-child(15) > tr:nth-child(1) > td.nfo',
                displays: '#specs-list > table:nth-child(15) > tr:nth-child(2) > td.nfo',
                camera: '#specs-list > table:nth-child(15) > tr:nth-child(3) > td.nfo',
                loud_speaker: '#specs-list > table:nth-child(15) > tr:nth-child(4) > td.nfo',
                audio_quality: '#specs-list > table:nth-child(15) > tr:nth-child(5) > td.nfo',
                battery_life: '#specs-list > table:nth-child(15) > tr:nth-child(6) > td.nfo'
            }
        })(function (err, found) {
            if (err) {
                console.log('There was an error in the webscraper: ' + err);
                return;
            }
            if (found === '' || isEmpty(found)) {
                console.log('Found nothing...');
                return;
            }
            if (typeof callback === "function") {
                callback(found);
            } else {
                console.info(found);
            }
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = extract;