const Sequelize = require('sequelize');



module.exports = new Sequelize('railway', 'root', 'RIyzYAeDSBh0taUPOHhv', {
    host : 'containers-us-west-91.railway.app',
    port : '5687',
    dialect : 'mysql',
    pool : {
        max : 5,
        min : 0,
        acquire: 30000,
        idle: 10000
    }

});