var assert = require('assert');
var extractor = require('../app/backend/Extractor/simple-extractor.js');
var fs = require('fs');
var dataParser = require('../app/js/data-parser.js');
var csv = require('csv-write-stream');

//Example output from extracting data from a page.
var jsonExampleData = {
    "title": "Samsung Galaxy S6 edge",
    "network": {
        "technology": "GSM / HSPA / LTE",
        "_2g": "GSM 850 / 900 / 1800 / 1900 ",
        "_3g": "HSDPA 850 / 900 / 1900 / 2100 ",
        "_3g_2": "HSDPA 850 / 900 / 1700 / 1900 / 2100 - SM-G925T",
        "_3g_3": "LTE band 1(2100), 2(1900), 3(1800), 4(1700/2100), 5(850), 7(2600), 8(900), 12(700), 17(700), 18(800), 19(800), 20(800), 26(850) - SM-G925F",
        "_4g": "LTE band 1(2100), 2(1900), 3(1800), 4(1700/2100), 5(850), 7(2600), 8(900), 12(700), 17(700) - SM-G925T",
        "_4g_2": "LTE band 1(2100), 2(1900), 3(1800), 4(1700/2100), 5(850), 7(2600), 8(900), 17(700), 20(800) - SM-G925A",
        "_4g_3": "HSPA 42.2/5.76 Mbps, LTE Cat6 300/50 Mbps",
        "speed": "Yes",
        "gprs": "Yes"
    },
    "launch": {
        "announced": "2015, March",
        "status": "Available. Released 2015, April"
    },
    "body": {
        "Dimensions": "142.1 x 70.1 x 7 mm (5.59 x 2.76 x 0.28 in)",
        "Weight": "132 g (4.66 oz)",
        "Build": "Corning Gorilla Glass 4 back panel",
        "Sim": "Nano-SIM",
        "Sim_2": "- Samsung Pay (Visa, MasterCard certified)"
    },
    "display": {
        "type": "Super AMOLED capacitive touchscreen, 16M colors",
        "size": "5.1 inches (~71.7% screen-to-body ratio)",
        "resolution": "1440 x 2560 pixels (~577 ppi pixel density)",
        "multitouch": "Yes",
        "protection": "Corning Gorilla Glass 4",
        "protection_2": "- TouchWiz UI - Curved edge screen"
    },
    "platform": {
        "OS": "Android OS, v5.0.2 (Lollipop), upgradable to v6.0.1 (Marshmallow)",
        "chipset": "Exynos 7420 Octa",
        "cpu": "Quad-core 1.5 GHz Cortex-A53 & Quad-core 2.1.0 GHz Cortex-A57",
        "gpu": "Mali-T760MP8"
    },
    "memory": {
        "cardslot": "No",
        "internal": "32/64/128 GB, 3 GB RAM"
    },
    "camera": {
        "primary": "16 MP, f/1.9, 28mm, OIS, autofocus, LED flash, check quality",
        "features": "1/2.6\" sensor size, 1.12 µm pixel size, geo-tagging, touch focus, face detection, Auto HDR, panorama",
        "features_2": "2160p@30fps, 1080p@60fps, 720p@120fps, HDR, dual-video rec., check quality",
        "video": "5 MP, f/1.9, 22mm, 1440p@30fps, dual video call, Auto HDR"
    },
    "sound": {
        "speaker_types": "Vibration; MP3, WAV ringtones",
        "loudspeaker": "Yes",
        "_3_5mm_jack": "Yes"
    },
    "comms": {
        "wlan": "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, hotspot",
        "bluetooth": "v4.1, A2DP, LE, apt-X",
        "gps": "Yes, with A-GPS, GLONASS, BDS",
        "nfc": "Yes",
        "infrared_port": "Yes",
        "radio": "No",
        "usb": "microUSB v2.0, USB Host"
    },
    "features": {
        "sensors": "Fingerprint, accelerometer, gyro, proximity, compass, barometer, heart rate, SpO2",
        "messaging": "SMS(threaded view), MMS, Email, Push Mail, IM",
        "browser": "HTML5",
        "Java": "No",
        "misc": "- Wireless charging (Qi/PMA) - market dependent - ANT+ support - S-Voice natural language commands and dictation - OneDrive (115 GB cloud storage) - Active noise cancellation with dedicated mic - MP4/DivX/XviD/WMV/H.264 player - MP3/WAV/WMA/eAAC+/FLAC player - Photo/video editor - Document editor"
    },
    "battery": {
        "battery": "Non-removable Li-Ion 2600 mAh battery",
        "talk_time": "Up to 18 h (3G)",
        "music_play": "Up to 50 h"
    },
    "misc": {
        "colours": "White Pearl, Black Sapphire, Gold Platinum, Green Emerald",
        "SAR_us": " 1.58 W/kg (head) 1.34 W/kg (body) ",
        "SAR_eu": " 0.33 W/kg (head) 0.59 W/kg (body) ",
        "price_group": "9/10 (About 560 EUR)"
    },
    "tests": {
        "performance": " Basemark OS II 2.0: 1750 / Basemark X: 27046",
        "displays": " Contrast ratio: Infinite (nominal), 4.124 (sunlight)",
        "camera": " Photo / Video",
        "loud_speaker": " Voice 69dB / Noise 66dB / Ring 73dB",
        "audio_quality": " Noise -95.6dB / Crosstalk -95.7dB",
        "battery_life": " Endurance rating 73h "
    }
};

//Note: For some reason when downloading html page from gsmarena directly it is different to the html obtained from a
//request or xray (which uses request) download. xray(webpageURL) is different to xray(localCopy).
describe('testing file writing and parser', function() {
    describe('random text', function() {
        it('should enter random text into a file', function(done) {
            fs.appendFile('./test/misc/test-txt.txt', 'text to add to file', [], function() {
                done();
            })
        });
    });
    describe('file stream', function() {
        it('stream text to file', function(done) {
            var fileStream = fs.createWriteStream('./test/misc/test-txt.txt');
            fileStream.write('streamed text');
            fileStream.on('finish', function() {
                assert.equal('streamed text', fs.readFileSync('./test/misc/test-txt.txt', {
                    encoding: 'utf8'
                }));
                done();
            });
            fileStream.end();
        });
    });
    describe('csv test', function() {
        it('should stringify singluar data into csv format', function(done) {
            var csvExporter = csv();
            /* Need callback on WriteStream instead of CSV so the close event
             * is fired after file has finished been written too.
             */
            var writeStream = fs.createWriteStream('./test/misc/test-txt.csv');
            writeStream.on('finish', function() {
                fs.readFile('./test/misc/test-txt.csv', 'utf8', function(e, d) {
                    console.log(d);
                    assert.equal(d, "MARKETING_NAME,FORM_FACTOR,DEVICE_TYPE,NETWORK_TECH,OS,UE_CATEGORY,IPV6_FLAG,VoWFi_FLAG,VoLTE_FLAG,SCREEN_SIZE,LAUNCH_DATE,MAX_SPEED,CHIPSET\n" +
                    "Samsung Galaxy S6 edge,,,GSM / HSPA / LTE,\"Android OS, v5.0.2 (Lollipop), upgradable to v6.0.1 (Marshmallow)\",,,,,1440 x 2560 pixels (~577 ppi pixel density),\"Available. Released 2015, April\",,\n");
                    done();
                });
            });
            csvExporter.pipe(writeStream);
            csvExporter.write(dataParser.translateDataFieldsCSV(jsonExampleData));
            csvExporter.end();
        })
        it('should stringify multiple data into csv format', function(done) {
            var csvExporter = csv();
            var writeStream = fs.createWriteStream('./test/misc/test-txt2.csv');
            /* Need callback on WriteStream instead of CSV so the close event
             * is fired after file has finished been written too.
             */
            writeStream.on('close', function() {
                fs.readFile('./test/misc/test-txt2.csv', 'utf8', function(e, d) {
                    console.log(d);
                    assert.equal(d, "MARKETING_NAME,FORM_FACTOR,DEVICE_TYPE,NETWORK_TECH,OS,UE_CATEGORY,IPV6_FLAG,VoWFi_FLAG,VoLTE_FLAG,SCREEN_SIZE,LAUNCH_DATE,MAX_SPEED,CHIPSET\n" +
                        "Samsung Galaxy S6 edge,,,GSM / HSPA / LTE,\"Android OS, v5.0.2 (Lollipop), upgradable to v6.0.1 (Marshmallow)\",,,,,1440 x 2560 pixels (~577 ppi pixel density),\"Available. Released 2015, April\",,\n" +
                        "Samsung Galaxy S6 edge,,,GSM / HSPA / LTE,\"Android OS, v5.0.2 (Lollipop), upgradable to v6.0.1 (Marshmallow)\",,,,,1440 x 2560 pixels (~577 ppi pixel density),\"Available. Released 2015, April\",,\n");
                    // console.log(fs.readFileSync('./test/misc/test-txt2.csv', 'utf8'));
                    done(); //File read to quickly.
                });
            });
            csvExporter.pipe(writeStream);
            csvExporter.write(dataParser.translateDataFieldsCSV(jsonExampleData));
            csvExporter.end(dataParser.translateDataFieldsCSV(jsonExampleData));
        })
    });
    describe('gsmArena parser', function() {
        it('should translate data fields', function(done) {
            var translatedData = dataParser.translateDataFields(jsonExampleData);
            assert.equal(translatedData['Samsung Galaxy S6 edge']['MARKETING_NAME'], "Samsung Galaxy S6 edge");
            assert.equal(translatedData['Samsung Galaxy S6 edge']['NETWORK_TECH'], "GSM / HSPA / LTE");
            done();
        })
        it('write to parser file correctly', function(done) {
            var fileWriteStream = new dataParser('./test/misc/test-txt.json', function() {
                fs.readFile('./test/misc/test-txt.json', 'utf8', function(e, d) {
                    var _d = JSON.parse(d);
                    assert.equal(_d['Samsung Galaxy S6 edge']['MARKETING_NAME'], "Samsung Galaxy S6 edge");
                    assert.equal(_d['Samsung Galaxy S6 edge']['NETWORK_TECH'], "GSM / HSPA / LTE");
                    done();
                });
            });
            fileWriteStream.deviceDataToFile(jsonExampleData);
            fileWriteStream.finished();
        });
    });
});
