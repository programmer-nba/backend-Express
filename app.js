var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cor = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

process.env.TZ='UTC'
var app = express();
//เชื่ิอมdatabase
const urldatabase =process.env.ATLAS_MONGODB
mongoose.Promise = global.Promise
mongoose.connect(urldatabase).then(()=>console.log("connect")).catch((err)=>console.error(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cor())
//router
const prefix = '/v1/Backend-Express'
app.use(prefix+'/', require('./routes/index'));
//ข้อมูล admin
app.use(prefix+'/admin',require('./routes/admin'));
//ข้อมูล team1
app.use(prefix+'/team1',require('./routes/team1'));
//ข้อมูล team2
app.use(prefix+'/team2',require('./routes/team2'));
//ข้อมูล login
app.use(prefix+'/login',require('./routes/login'));
//ข้อมูลลูกค้า
app.use(prefix+'/customer',require('./routes/customer'));
//ข้อมูลใบเสนอราคา
app.use(prefix+'/quotation',require('./routes/quotation'));
//ข้อมูลการดีลงานกลาง
app.use(prefix+'/centralwork',require('./routes/centralwork'));
//ข้อมูลการดีลงานกับลูกค้า
app.use(prefix+'/customswork',require('./routes/coordinatecustomer'))
//ข้อมูล report 
app.use(prefix+'/report',require('./routes/report'))
//ข้อมูล zone 
app.use(prefix+'/zone',require('./routes/zone'))
//ข้อมุลทีมย่อยทีมเปิด
app.use(prefix+'/team_byteam1',require('./routes/team_byteam1'))
//ข้อมูลทีมย่อยของทีมปิด
app.use(prefix+'/team_byteam2',require('./routes/team_byteam2'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // หรือกำหนด origin ที่เฉพาะเจาะจง
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
const port = process.env.PORT || 4949;
app.listen(port, console.log(`Listening on port ${port}`));
