const express = require('express');
const app = express();


// Import routes
const blogRoute = require('./routes/blog');


//Router MIddlewares
app.use(express.json());
app.use('/blog', blogRoute);

module.exports = app;
