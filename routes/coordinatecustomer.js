var express = require('express');
var router = express.Router();
const Team = require('../authentication/teamAuth')
const Coordinatecustomers =require('../controllers/coordinatecustomer.controller');


//สร้างข้อมูลการเดลงานกับลูกค้า
router.post('/',Team.tokenteam2,Coordinatecustomers.add)
//ดึงข้อมูลทั้งหมด
router.get('/',Team.all,Coordinatecustomers.getall)
//ดึงข้อมูล by id
router.get('/byid/:id',Team.all,Coordinatecustomers.getbyid)
//ลบข้อมูลการเดลงานกับลูกค้า
router.delete('/:id',Team.all,Coordinatecustomers.delete)

module.exports = router;