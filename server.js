const express = require('express');
const app = express();



require('./startup/db')();
require('./startup/routes')(app);

const PORT = process.env.PORT || 3100;
const server = app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}....`)
});

module.exports = server;