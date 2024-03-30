const express = require('express');
const urlRoutes = require('./routes/url')
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const app = express();
const PORT  = process.env.PORT || 5050;

app.use(express.json());
app.use('/',urlRoutes)

app.get('/',(req,res)=>{
    console.log(DB_HOST, DB_USER, DB_PASS);
    console.log(typeof DB_HOST, typeof DB_USER, typeof DB_PASS);
    res.send('ok')
})


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})

