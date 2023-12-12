var express = require('express');
var router = express.Router();
const adminAuth = require('../authentication/adminAuth')
const Team1 =require('../controllers/team1.controller')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

//สร้างรหัส admin 
router.post('/',adminAuth,Team1.add)

//ดึงข้อมูลทั้งหมด
router.get('/',Team1.getall)
//ดึงข้อมูล by id
router.get('/byid/:id',Team1.getbyid)
// แก้ไขข้อมูล admin 
router.put('/:id',Team1.edit)
// ลบข้อมูล admin
router.delete('/:id',adminAuth,Team1.delete)

module.exports = router;