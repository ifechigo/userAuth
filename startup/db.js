const mongoose = require('mongoose');



module.exports = function () {
  mongoose.connect('mongodb://localhost/customer', {useNewUrlParser: true, useUnifiedTopology: true});
  const db = mongoose.connection
  db.on('error', (err)=>{
    console.log(err);
  })
  db.once('open', ()=>{
    console.log('database connection sucessfully established');
  })
}
