const mysql = require("mysql");

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

var con = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: DB_USER,
    password: DB_PASS,
    database: DB_USER

});

module.exports = con;

