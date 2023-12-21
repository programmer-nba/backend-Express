const Zone = require('../models/zone.schema');


//เพิ่มข้อมูลโซน

module.exports.add = async (req, res) => {
    try{
        const zonedata = new Zone({
            name: req.body.name
        })
        const add = await zonedata.save();
        return res.status(200).send({status:true,data:add,message:"เพิ่มข้อมูลโซนสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ค้นหาข้อมูลโซนทั้งหมด
module.exports.getall = async (req,res) =>{
    try{    
        const zonedata = await Zone.find()
        if(!zonedata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล"})
        }
        return res.status(200).send({status:true,data:zonedata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ค้นหาข้อมูลโซน by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const zonedata = await Zone.findById(req.params.id)
        if(!zonedata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล"})
        }
        return res.status(200).send({status:true,data:zonedata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//แก้ไขข้อมูลโซน
module.exports.edit = async (req, res) => {
    try{
        const id = req.params.id
        const zone = await Zone.findById(id)
        if(!zone)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล"})
        }
        const zonedata ={
            name: req.body.name
        }
        const edit = await Zone.findByIdAndUpdate(id,zonedata,{new:true})
        return res.status(200).send({status:true,data:edit,message:"แก้ไขข้อมูลโซนสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    } 
}

//ลบข้อมูลโซน
module.exports.delete = async (req,res) =>{
    try{    
        const id = req.params.id;
        const zonedata = await Zone.findById(id)
        if(!zonedata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล"})
        }
        const deletes = await Zone.findByIdAndDelete(id)
        return res.status(200).send({status:true,data:deletes})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}