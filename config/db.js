const Sequelize = require('sequelize');
const {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER} = require('./produccion');


module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    DB_HOST,
    DB_PORT,
    dialect : 'mysql',
    pool : {
        max : 5,
        min : 0,
        acquire: 30000,
        idle: 10000
    }

});