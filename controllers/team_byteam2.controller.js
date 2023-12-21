const Team_byteam2 = require('../models/team_byteam2.schema')

//เพิ่มข้อมูลทีมย่อยของทีมปิด
module.exports.add = async (req, res) => {
    try{
        const team_byteam2data = new Team_byteam2({
            name: req.body.name,
            zone: req.body.zone
        })
        const add = await team_byteam2data.save();
        return res.status(200).send({status:true,data:add,message:"เพิ่มข้อมูลทีมสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ค้นหาข้อมูลทีมย่อยของทีมปิด
module.exports.getall = async (req,res) =>{
    try{    
        const team_byteam2data = await Team_byteam2.find().populate('zone.zoneid')
        if(!team_byteam2data){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล"})
        }
        return res.status(200).send({status:true,data:team_byteam2data})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ค้นหาข้อมูลทีมย่อยของทีมปิด by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const team_byteam2data = await Team_byteam2.findById(req.params.id).populate('zone.zoneid')
        if(!team_byteam2data){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล"})
        }
        return res.status(200).send({status:true,data:team_byteam2data})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//แก้ไขข้อมูลทีมย่อยของทีมปิด
module.exports.edit = async (req, res) => {
    try{
        const id = req.params.id
        const team_byteam2 = await Team_byteam2.findById(id)
        if(!team_byteam2)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล"})
        }
        const team_byteam2data ={
            name: req.body.name,
            zone: req.body.zone
        }
        const edit = await Team_byteam2.findByIdAndUpdate(id,team_byteam2data,{new:true})
        return res.status(200).send({status:true,data:edit,message:"แก้ไขข้อมูลทีมสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    } 
}

//ลบข้อมูลทีมย่อยของทีมปิด
module.exports.delete = async (req,res) =>{
    try{    
        const id = req.params.id;
        const team_byteam2data = await Team_byteam2.findById(id)
        if(!team_byteam2data){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล"})
        }
        const deletes = await Team_byteam2.findByIdAndDelete(id)
        return res.status(200).send({status:true,data:deletes})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}