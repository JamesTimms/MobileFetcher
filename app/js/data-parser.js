/**
 * Created by James on 30/11/2015.
 */
'use strict';
//
var fs = require('fs');
var csv = require('csv-write-stream');
var csvExporter = '',
    fileWriteStream = '';

function DataParser(file, callback) {
    //TODO: Add support for JSON exporter.
    csvExporter = csv();
    fileWriteStream = fs.createWriteStream(file);
    if (callback) {
        fileWriteStream.on('close', callback);
    };
    /* Need callback on WriteStream instead of CSV so the close event
     * is fired after file has finished been written too.
     */
    csvExporter.pipe(fileWriteStream);
}

var translateDataFields = function(data) {
    var _d = {};
    _d[data['title']] = {
        MARKETING_NAME: data['title'],
        FORM_FACTOR: '',
        DEVICE_TYPE: '',
        NETWORK_TECH: data['network']['technology'],
        OS: data['platform']['OS'],
        UE_CATEGORY: '',
        IPV6_FLAG: '',
        VoWFi_FLAG: '',
        VoLTE_FLAG: '',
        SCREEN_SIZE: data['display']['resolution'], //Might need to review this value. More data available here.
        LAUNCH_DATE: data['launch']['status'],
        MAX_SPEED: data['technology'], //Will need to do some inference here. Regex to find strings etc...
        CHIPSET: ''
    };
    return _d;
}

var translateDataFieldsCSV = function(data) {
    var _d = {
        MARKETING_NAME: data['title'],
        FORM_FACTOR: '',
        DEVICE_TYPE: '',
        NETWORK_TECH: data['network']['technology'],
        OS: data['platform']['OS'],
        UE_CATEGORY: '',
        IPV6_FLAG: '',
        VoWFi_FLAG: '',
        VoLTE_FLAG: '',
        SCREEN_SIZE: data['display']['resolution'], //Might need to review this value. More data available here.
        LAUNCH_DATE: data['launch']['status'],
        MAX_SPEED: data['technology'], //Will need to do some inference here. Regex to find strings etc...
        CHIPSET: data['platform']['chipset'],
        network_2g: data['network']['_2g'],
        network_3g: data['network']['_3g'],
        network_3g_2: data['network']['_3g_2'],
        network_3g_3: data['network']['_3g_3'],
        network_4g: data['network']['_4g'],
        network_4g_2: data['network']['_4g_2'],
        network_4g_3: data['network']['_4g_3'],
        network_speed: data['network']['speed'],
        network_gprs: data['network']['gprs'],
        launch_announced: data['launch']['announced'],
        body_dimensions: data['body']['dimensions'],
        body_weight: data['body']['weight'],
        body_build: data['body']['build'],
        body_sim: data['body']['sim'],
        display_type: data['display']['type'],
        body_sim2: data['body']['sim_2'],
        display_size: data['display']['size'],
        display_multitouch: data['display']['multitouch'],
        display_protection: data['display']['protection'],
        display_protection_2: data['display']['protection_2'],
        platform_cpu: data['platform']['cpu'],
        platform_gpu: data['platform']['gpu'],
        memory_cardslot: data['memory']['cardslot'],
        memory_internal: data['memory']['internal'],
        camera_primary: data['camera']['primary'],
        camera_features: data['camera']['features'],
        camera_features_2: data['camera']['features_2'],
        camera_video: data['camera']['video'],
        sound_speaker_types: data['sound']['speaker_types'],
        sound_loudspeaker: data['sound']['loud_speaker'],
        sound_3_5mm_jack: data['sound']['_3_5mm_jack'],
        comms_wlan: data['comms']['wlan'],
        comms_bluetooth: data['comms']['bluetooth'],
        comms_gps: data['comms']['gps'],
        comms_nfc: data['comms']['nfc'],
        comms_infrared_port: data['comms']['infrared_port'],
        comms_radio: data['comms']['radio'],
        comms_usb: data['comms']['usb'],
        features_sensors: data['features']['sensors'],
        features_messaging: data['features']['messaging'],
        features_browser: data['features']['browser'],
        features_java: data['features']['java'],
        features_misc: data['features']['misc'],
        battery_battery: data['battery']['battery'],
        battery_talk_time: data['battery']['talk_time'],
        battery_music_play: data['battery']['music_play'],
        misc_colours: data['misc']['colours'],
        misc_SAR_us: data['misc']['SAR_us'],
        misc_SAR_eu: data['misc']['SAR_eu'],
        misc_price_group: data['misc']['price_group'],
        tests_performance: data['tests']['performance'],
        tests_displays: data['tests']['displays'],
        tests_camera: data['tests']['camera'],
        tests_loud_speaker: data['tests']['loud_speaker'],
        tests_audio_quality: data['tests']['audio_quality'],
        tests_battery_life: data['tests']['battery_life']
    };
    return _d;
}

DataParser.prototype.write = function(data) {
    if (csvExporter == '') {
        console.log('File stream is closed. Cannot write to file.');
        return;
    }
    if (!data) {
        console.log('Failed to write to file because there was no data.');
        return;
    }

    try {
        var _d = translateDataFieldsCSV(data);
        csvExporter.write(_d, 'utf8');
    } catch (ex) {
        console.log("Failed to write JSON to file due to... " + ex);
    }
}

DataParser.prototype.deviceDataToFile = function(data) {
    this.write(data);
};

DataParser.prototype.end = function(data) {
    if (data) {
        csvExporter.end(translateDataFieldsCSV(data));
    } else {
        csvExporter.end();
    }
    csvExporter = '';
}

var logError = function(file, data) {
    if (!data) {
        console.log('Failed to write to file because data was null.');
        return;
    }

    try {
        if (!fs.existsSync('./app/storage/logs/')) {
            fs.mkdirSync('./app/storage/logs');
        }
        fs.appendFile('./app/storage/logs/' + file, data);
    } catch (ex) {
        console.log("Error logging failed due to: " + ex);
    }
};

module.exports = DataParser;
module.exports.logError = logError;
module.exports.translateDataFields = translateDataFields;
module.exports.translateDataFieldsCSV = translateDataFieldsCSV;
