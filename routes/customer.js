var express = require('express');
var router = express.Router();
const Team = require('../authentication/teamAuth')
const Customer =require('../controllers/customer.controller')
const adminAuth = require('../authentication/adminAuth')
//สร้าง ลูกค้า
router.post('/',Team.tokenteam1,Customer.add)
//สร้าง ลูกค้า โดย admin
router.post('/admin/',adminAuth,Customer.addadmin)
//ดึงข้อมูลทั้งหมด
router.get('/',Team.all,Customer.getall)
//ดึงข้อมูล by id
router.get('/byid/:id',Team.all,Customer.getbyid)
//ดึงข้อมูล by team1_id
router.get('/byteam1/:id',Team.all,Customer.getbyteam1id)
//แก้ไขข้อมูลลูกค้า 
router.put('/:id',Team.all,Customer.edit)
//ลบข้อมูลลูกค้า
router.delete('/:id',Team.all,Customer.delete)

module.exports = router;