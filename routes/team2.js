var express = require('express');
var router = express.Router();
const adminAuth = require('../authentication/adminAuth')
const Team2 =require('../controllers/team2.controller')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

//สร้างรหัส admin 
router.post('/',adminAuth,Team2.add)

//ดึงข้อมูลทั้งหมด
router.get('/',Team2.getall)
//ดึงข้อมูล by id
router.get('/byid/:id',Team2.getbyid)
// แก้ไขข้อมูล admin 
router.put('/:id',Team2.edit)
// ลบข้อมูล admin
router.delete('/:id',adminAuth,Team2.delete)
//เพิ่มรูป
router.post('/image/:id',Team2.image)
//ลบรูป
router.delete('/:id/deleteimage/:image',Team2.deleteimage)
module.exports = router;