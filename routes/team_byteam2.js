var express = require('express');
var router = express.Router();
const Team = require('../authentication/teamAuth')
const team_byteam2 = require('../controllers/team_byteam2.controller')

//สร้างข้อมูลทีมเปิด
router.post('/',Team.all,team_byteam2.add)
//ดึงข้อมูลทีมเปิด ทั้งหมด
router.get('/',Team.all,team_byteam2.getall)
//ดึงข้อมูลทีมเปิด by id
router.get('/byid/:id',Team.all,team_byteam2.getbyid)
// แก้ไขข้อมูลทีมเปิด
router.put('/:id',Team.all,team_byteam2.edit)
// ลบข้อมูลทีมเปิด
router.delete('/:id',Team.all,team_byteam2.delete)

module.exports = router;