'use strict';

var dbm;
var type;
var seed;
var fs = require('fs');
var path = require('path');
var Promise;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};

exports.up = function (db) {
  // Users Table
  var filePath = path.join(
    __dirname,
    'sqls',
    '20221103182840-users-table-up.sql'
  );
  return (
    new Promise(function (resolve, reject) {
      fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (err) return reject(err);
        console.log('received data: ' + data);

        resolve(data);
      });
    })
      .then(function (data) {
        return db.runSql(data);
        // Products Table
      })
      .then((result) => {
        const filePath2 = path.join(
          __dirname,
          'sqls',
          '20221103044247-products-table-up.sql'
        );
        return new Promise(function (resolve, reject) {
          fs.readFile(filePath2, { encoding: 'utf-8' }, function (err, data) {
            if (err) return reject(err);
            console.log('received data: ' + data);
            resolve(data);
          });
        });
      })
      .then(function (data) {
        return db.runSql(data);
      })
      // Orders Table
      .then((result) => {
        const filePath3 = path.join(
          __dirname,
          'sqls',
          '20221103044309-orders-table-up.sql'
        );
        return new Promise(function (resolve, reject) {
          fs.readFile(filePath3, { encoding: 'utf-8' }, function (err, data) {
            if (err) return reject(err);
            console.log('received data: ' + data);

            resolve(data);
          });
        });
      })
      .then(function (data) {
        return db.runSql(data);
      })
      // Order_Products Table
      .then((result) => {
        const filePath4 = path.join(
          __dirname,
          'sqls',
          '20221103044623-order-products-table-up.sql'
        );
        return new Promise(function (resolve, reject) {
          fs.readFile(filePath4, { encoding: 'utf-8' }, function (err, data) {
            if (err) return reject(err);
            console.log('received data: ' + data);

            resolve(data);
          });
        });
      })
      .then(function (data) {
        return db.runSql(data);
      })
  );
};

exports.down = function (db) {
  // Order_Products
  var filePath = path.join(
    __dirname,
    'sqls',
    '20221103044623-order-products-table-down.sql'
  );
  return (
    new Promise(function (resolve, reject) {
      fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (err) return reject(err);
        console.log('received data: ' + data);

        resolve(data);
      });
    })
      .then(function (data) {
        return db.runSql(data);
        // Orders Table
      })
      .then((result) => {
        const filePath2 = path.join(
          __dirname,
          'sqls',
          '20221103044309-orders-table-down.sql'
        );
        return new Promise(function (resolve, reject) {
          fs.readFile(filePath2, { encoding: 'utf-8' }, function (err, data) {
            if (err) return reject(err);
            console.log('received data: ' + data);

            resolve(data);
          });
        });
      })
      .then(function (data) {
        return db.runSql(data);
      })
      // Products Table
      .then((result) => {
        const filePath3 = path.join(
          __dirname,
          'sqls',
          '20221103044247-products-table-down.sql'
        );
        return new Promise(function (resolve, reject) {
          fs.readFile(filePath3, { encoding: 'utf-8' }, function (err, data) {
            if (err) return reject(err);
            console.log('received data: ' + data);

            resolve(data);
          });
        });
      })
      .then(function (data) {
        return db.runSql(data);
      })
      // Users Table
      .then((result) => {
        const filePath4 = path.join(
          __dirname,
          'sqls',
          '20221103182840-users-table-down.sql'
        );
        return new Promise(function (resolve, reject) {
          fs.readFile(filePath4, { encoding: 'utf-8' }, function (err, data) {
            if (err) return reject(err);
            console.log('received data: ' + data);

            resolve(data);
          });
        });
      })
      .then(function (data) {
        return db.runSql(data);
      })
  );
};

exports._meta = {
  version: 1,
};
