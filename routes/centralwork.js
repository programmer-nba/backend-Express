var express = require('express');
var router = express.Router();
const Team = require('../authentication/teamAuth')
const Centralwork =require('../controllers/centralwork.controller')




//ดึงข้อมูลทั้งหมด
router.get('/',Team.all,Centralwork.getall)
//ดึงข้อมูล by id
router.get('/byid/:id',Team.all,Centralwork.getbyid)
//ดึงข้อมูล by team1_id
router.get('/byteam1/:id',Team.all,Centralwork.getbyteam1id)
//ดึงข้อมูล by team2_id
router.get('/byteam2/:id',Team.all,Centralwork.getbyteam2id)
//แก้ไขข้อมูลการเดลงานกลาง 
router.put('/:id',Team.all,Centralwork.edit)


//รับงาน
router.put('/addwork/:id',Team.tokenteam2,Centralwork.addworkteam2)


module.exports = router;