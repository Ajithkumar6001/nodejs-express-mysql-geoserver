const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
const logger=require('../../logger');
var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  logging:(message)=>{logger.info(message)}
});

module.exports = connection;
