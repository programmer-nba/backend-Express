const Admin = require('../models/admin.schema')
const Team1 = require('../models/team1.schema')
const Team2 = require('../models/team2.schema')
//สร้าง function เช็คชื่อซ้ำ2 ตาราง

async function Checkusername(username){
    const checkAdmin = await Admin.findOne({username:username})
    if(checkAdmin) return true
    const checkTeam1 = await Team1.findOne({username:username})
    if(checkTeam1) return true
    const checkTeam2 = await Team2.findOne({username:username})
    if(checkTeam2) return true    
    return false
}

const checkalluse = {
    Checkusername
};
module.exports = checkalluse