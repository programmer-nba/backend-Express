var express = require('express');
var router = express.Router();
const Team = require('../authentication/teamAuth')
const team_byteam1 = require('../controllers/team_byteam1.controller')

//สร้างข้อมูลทีมเปิด
router.post('/',Team.all,team_byteam1.add)
//ดึงข้อมูลทีมเปิด ทั้งหมด
router.get('/',Team.all,team_byteam1.getall)
//ดึงข้อมูลทีมเปิด by id
router.get('/byid/:id',Team.all,team_byteam1.getbyid)
// แก้ไขข้อมูลทีมเปิด
router.put('/:id',Team.all,team_byteam1.edit)
// ลบข้อมูลทีมเปิด
router.delete('/:id',Team.all,team_byteam1.delete)

module.exports = router;