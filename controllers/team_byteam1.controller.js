const Team_byteam1 = require('../models/team_byteam1.schema')

//เพิ่มข้อมูลทีมเปิด
module.exports.add = async (req, res) => {
    try{
        const team_byteam1data = new Team_byteam1({
            name: req.body.name,
            zone: req.body.zone
        })
        const add = await team_byteam1data.save();
        return res.status(200).send({status:true,data:add,message:"เพิ่มข้อมูลทีมสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ค้นหาข้อมูลทีมเปิด
module.exports.getall = async (req,res) =>{
    try{    
        const team_byteam1data = await Team_byteam1.find().populate('zone.zoneid')
        if(!team_byteam1data){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล"})
        }
        return res.status(200).send({status:true,data:team_byteam1data})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ค้นหาข้อมูลทีมเปิด by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const team_byteam1data = await Team_byteam1.findById(req.params.id).populate('zone.zoneid')
        if(!team_byteam1data){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล"})
        }
        return res.status(200).send({status:true,data:team_byteam1data})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//แก้ไขข้อมูลทีมเปิด
module.exports.edit = async (req, res) => {
    try{
        const id = req.params.id
        const team_byteam1 = await Team_byteam1.findById(id)
        if(!team_byteam1)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล"})
        }
        const team_byteam1data ={
            name: req.body.name,
            zone: req.body.zone
        }
        const edit = await Team_byteam1.findByIdAndUpdate(id,team_byteam1data,{new:true})
        return res.status(200).send({status:true,data:edit,message:"แก้ไขข้อมูลทีมสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    } 
}

//ลบข้อมูลทีมเปิด
module.exports.delete = async (req,res) =>{
    try{    
        const id = req.params.id;
        const team_byteam1data = await Team_byteam1.findById(id)
        if(!team_byteam1data){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล"})
        }
        const deletes = await Team_byteam1.findByIdAndDelete(id)
        return res.status(200).send({status:true,data:deletes})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}