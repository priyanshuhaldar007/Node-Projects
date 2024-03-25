const swaggerAutogen = require('swagger-autogen')();

const PORT = process.env.PORT || 5050;

const doc = {
    info: {
        title : 'Efficient REST API Documentation',
        version: '1.0.0',
        description: 'API Documentation for REST APIs'
    },
    host: `localhost:${PORT}`,
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const routes =["./index.js"];


swaggerAutogen(outputFile, routes, doc).then(()=>{
    require('./index.js');
});