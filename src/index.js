const express = require('express')
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/mevn-database')
  .then(db => console.log('La DB está conectada'))
  .catch(err => console.log(err))


//Setting
app.set('port', process.env.PORT || 4000);

//Middlewares 
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use('/api/tasks', require('./routes/tasks'))

//Static Files
app.use(express.static(__dirname + "/public"));

//Server is listening
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
})
 {}