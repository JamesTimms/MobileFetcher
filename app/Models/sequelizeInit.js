/**
 * Created by James on 29/01/2016.
 */
var Sequelize = require('sequelize');

var init = function (done) {
    var sequelize = new Sequelize('database', 'username', 'password', {
        host: 'localhost',
        dialect: 'sqlite',

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        storage: 'app/storage/database/mobile-fetcher-db'
    });

    var mobileDevice = sequelize.define('mobileDevice', {
        //id: {
        //    type: Sequelize.INTEGER,
        //    autoIncrement: true,
        //    primaryKey: true
        //},
        name: {
            type: Sequelize.STRING,
            field: 'mobile_name'
        }
    });
    console.log('creating...');

    mobileDevice.sync({force: true}).then(function () {
        console.log('now create first mobile device...');
        return mobileDevice.create({
            name: 'exampleName'
        }, function () {
            console.log('Failed to create example mobile device in database...');
        });
    }).then(function () {
        console.log('and then...');
    }).then(function () {
        console.log('looking...');
        mobileDevice.findAll().then(function (found) {
            console.log('found?');
            console.log(found[0]);
            done();
        });
    });
};

module.exports = init;