var express = require('express');
var router = express.Router();
const Team = require('../authentication/teamAuth')
const Quotation =require('../controllers/quotation.controller')

//สร้าง ลูกค้า
router.post('/',Team.tokenteam1,Quotation.add)
//ดึงข้อมูลทั้งหมด
router.get('/',Team.all,Quotation.getall)
//ดึงข้อมูล by id
router.get('/byid/:id',Team.all,Quotation.getbyid)
//แก้ไขข้อมูลลูกค้า 
router.put('/:id',Team.all,Quotation.edit)
//ลบข้อมูลลูกค้า
router.delete('/:id',Team.all,Quotation.delete)

module.exports = router;