const mysql =require('mysql2');
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const config = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_USER
};

const pool = mysql.createPool(config);

module.exports = pool;