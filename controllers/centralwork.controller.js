
const Customer =  require('../models/customer.schema')
const Team1  = require('../models/team1.schema')
const Team2  =require('../models/team2.schema')
const Quotation = require('../models/quotation.schema')
const Coordinatecustomers = require('../models/coordinatecustomers.schema')
const Centralwork = require('../models/centralwork.schema')
//ค้นหาข้อมูลการเดลงานกลางทั้งหมด
module.exports.getall = async (req,res) =>{
    try{    
        const centralworkdata = await Centralwork.find().populate("quotation_id").populate("team1_id").populate("team2_id").populate("customer_id").populate("coordinatecustomers.coordinatecustomers_id")
        if(!centralworkdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }
        return res.status(200).send({status:true,data:centralworkdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ค้นหาข้อมูลการเดลงานกลาง by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const id = req.params.id
        const centralworkdata = await Centralwork.findById(id).populate("quotation_id").populate("team1_id").populate("team2_id").populate("customer_id").populate("coordinatecustomers.coordinatecustomers_id")
        if(!centralworkdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }
        return res.status(200).send({status:true,data:centralworkdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ค้นหาตามคนที่นำเข้า ตาม team 1 
module.exports.getbyteam1id = async (req,res) =>{
    try{
        const id = req.params.id    
        const centralworkdata = await Centralwork.find({team1_id:id}).populate("quotation_id").populate("team1_id").populate("team2_id").populate("customer_id").populate("coordinatecustomers.coordinatecustomers_id")
        if(!centralworkdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }
        return res.status(200).send({status:true,data:centralworkdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ค้นหาตามคนที่นำเข้า ตาม team 2 
module.exports.getbyteam2id = async (req,res) =>{
    try{
        const id = req.params.id    
        const centralworkdata = await Centralwork.find({team2_id:id}).populate("quotation_id").populate("team1_id").populate("team2_id").populate("customer_id").populate("coordinatecustomers.coordinatecustomers_id")
        if(!centralworkdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }
        return res.status(200).send({status:true,data:centralworkdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}


//แก้ไขข้อมูลการเดลงานกลาง
module.exports.edit = async (req, res) => {
    try{
        const id = req.params.id
        const centralwork = await Centralwork.findById(id)
        if(!centralwork)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลการเดลงาน"})
        }
        const centralworkdata ={
            quotation_id :req.body.quotation_id,
            team1_id:req.body.team1_id,
            team2_id:req.body.team2_id,
            customer_id: req.body.customer_id,
            datepull :req.body.datepull,
            coordinatecustomers: req.body.coordinatecustomers
        }

        const edit = await Centralwork.findByIdAndUpdate(id,centralworkdata,{new:true})
        return res.status(200).send({status:true,data:edit,message:"เพิ่มข้อมูลการเดลงานสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
    
}

//team 2 งานเดล
module.exports.addworkteam2 = async (req, res) => {
    try{
        const id = req.params.id
        const centralwork = await Centralwork.findById(id)
        if(!centralwork)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลการเดลงาน"})
        }
        const centralworkdata ={
            team2_id:req.body.team2_id,
            datepull :Date.now(),
        }
        const edit = await Centralwork.findByIdAndUpdate(id,centralworkdata,{new:true})
        return res.status(200).send({status:true,data:edit,message:"เพิ่มข้อมูลการเดลงานสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
    
}