
const Customer =  require('../models/customer.schema')
const Team1  = require('../models/team1.schema')
const Team2  =require('../models/team2.schema')
const Quotation = require('../models/quotation.schema')
const Coordinatecustomers = require('../models/coordinatecustomers.schema')
const Centralwork = require('../models/centralwork.schema')
//ค้นหาข้อมูลการดีลงานกลางทั้งหมด
module.exports.getall = async (req,res) =>{
    try{    
        const centralworkdata = await Centralwork.find().populate({ 
            path: "quotation_id", 
            populate: [
              { path: "customer_id" },
              { path: "team1_id" }, 
            ]
          }).populate("team1_id").populate("team2_id").populate("customer_id").populate("coordinatecustomers.coordinatecustomers_id")
        if(!centralworkdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }
        return res.status(200).send({status:true,data:centralworkdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ค้นหาข้อมูลการดีลงานกลาง by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const id = req.params.id
        const centralworkdata = await Centralwork.findById(id).populate({ 
            path: "quotation_id", 
            populate: [
              { path: "customer_id" },
              { path: "team1_id" }, 
            ]
          }).populate("team1_id").populate("team2_id").populate("customer_id").populate("coordinatecustomers.coordinatecustomers_id")
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
        const centralworkdata = await Centralwork.find({team1_id:id}).populate({ 
            path: "quotation_id", 
            populate: [
              { path: "customer_id" },
              { path: "team1_id" }, 
            ]
          }).populate("team1_id").populate("team2_id").populate("customer_id").populate("coordinatecustomers.coordinatecustomers_id")
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
        const centralworkdata = await Centralwork.find({team2_id:id}).populate({ 
            path: "quotation_id", 
            populate: [
              { path: "customer_id" },
              { path: "team1_id" }, 
            ]
          }).populate("team1_id").populate("team2_id").populate("customer_id").populate("coordinatecustomers.coordinatecustomers_id")
        if(!centralworkdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }

        return res.status(200).send({status:true,data:centralworkdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}


//แก้ไขข้อมูลการดีลงานกลาง
module.exports.edit = async (req, res) => {
    try{
        const id = req.params.id
        const centralwork = await Centralwork.findById(id)
        if(!centralwork)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลการดีลงาน"})
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
        return res.status(200).send({status:true,data:edit,message:"เพิ่มข้อมูลการดีลงานสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
    
}

//team 1 งานดีล
module.exports.addworkteam1 = async (req, res) => {
    try{
        const id = req.params.id
        const centralwork = await Centralwork.findById(id)
        if(!centralwork)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลการดีลงาน"})
        }
        const centralworkdata ={
            team1_id:req.body.team1_id,
            dateexpirationteam1: new Date(Date.now()+ (31 * 24 * 60 * 60 * 1000))
        }
        const edit = await Centralwork.findByIdAndUpdate(id,centralworkdata,{new:true})
        const editcustomerdata = await Customer.findByIdAndUpdate(centralwork._id,{team_id:req.body.team1_id},{new:true}) 
        return res.status(200).send({status:true,data:edit,customer:editcustomerdata,message:"เพิ่มข้อมูลการดีลงานสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
    
}
//team 2 งานดีล
module.exports.addworkteam2 = async (req, res) => {
    try{
        const id = req.params.id
        const centralwork = await Centralwork.findById(id)
        if(!centralwork)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลการดีลงาน"})
        }
        const centralworkdata ={    
            team2_id:req.body.team2_id,
            dateexpirationteam2: new Date(Date.now()+ (60 * 24 * 60 * 60 * 1000))
        }
        const edit = await Centralwork.findByIdAndUpdate(id,centralworkdata,{new:true})
        return res.status(200).send({status:true,data:edit,message:"เพิ่มข้อมูลการดีลงานสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
    
}

//ส่งรายงานการดีลของ team 1
module.exports.addreportteam1 = async (req, res) => {
    try{

        const id = req.params.id
        const centralwork = await Centralwork.findById(id)
        if(!centralwork)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลการดีลงาน"})
        }
        const centralworkdata ={
            workloadmonth : req.body.workloadmonth, //(ปริมาณงาน/เดือน)
            opportunity :req.body.opportunity,//(โอกาสในการปิดงาน)
            forcastpercent :req.body.forcastpercent, //(Forcast/ %)
            forcastcupboard :req.body.forcastcupboard,//(Forcast/ตู้)
            note:req.body.note, //หมายเหตุ
        }
        const edit = await Centralwork.findByIdAndUpdate(id,centralworkdata,{new:true})
       
        return res.status(200).send({status:true,data:edit,message:"เพิ่มข้อมูลการดีลงานสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
    
}
