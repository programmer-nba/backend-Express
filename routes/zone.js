var express = require('express');
var router = express.Router();
const adminAuth = require('../authentication/adminAuth')
const Team = require('../authentication/teamAuth')
const Zone = require('../controllers/zone.controller')

//สร้างข้อมูล zone 
router.post('/',Team.all,Zone.add)
//ดึงข้อมูล zone ทั้งหมด
router.get('/',Team.all,Zone.getall)
//ดึงข้อมูล by id
router.get('/byid/:id',Team.all,Zone.getbyid)
// แก้ไขข้อมูล zone 
router.put('/:id',Team.all,Zone.edit)
// ลบข้อมูล admin
router.delete('/:id',Team.all,Zone.delete)

module.exports = router;