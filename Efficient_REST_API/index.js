const express = require("express");
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/users.js');
const swaggerUI = require('swagger-ui-express');
const swaggerDocuments = require('./swagger-output.json');

const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use('/users',userRoutes);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocuments));

app.listen(PORT,()=>{
    console.log(`Server listening on http://localhost:${PORT}`);
})