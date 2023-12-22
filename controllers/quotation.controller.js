const Quotation = require('../models/quotation.schema')
const Customer =  require('../models/customer.schema')
const Team1  = require('../models/team1.schema')
const Centralwork = require('../models/centralwork.schema')
//เพิ่มข้อมูลลูกค้า
module.exports.add = async (req, res) => {
    try{
        const startDate = new Date();
        // สร้างวันที่ของวันถัดไป
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 1);
        // ปรับเวลาให้เป็นเริ่มต้นของวัน
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        const quotationdata = await Quotation.find({
            createdAt: {
              $gte: startDate,
              $lt: endDate
            }
          });
        const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const referenceNumber = String(quotationdata.length).padStart(5, '0')
        const refno = `${currentDate}${referenceNumber}`

        const customer = await Customer.findById(req.body.customer_id)
        if(!customer)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }
        const team1 = await Team1.findById(req.body.team1_id)
        if(!team1)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลทีม1"})
        }
        const data = new Quotation({
            datequotation:req.body.datequotation,//(วันที่ออกใบเสนอราคา)
	        refno :refno, //(เลขที่อ้างอิง)
	        customer_id:req.body.customer_id, //(ชื่อลูกค้า)(ดึงชื่อบริษัทมา) (ดึงข้อมูลลูกค้ามา)
	        
            commodity:req.body.commodity,// สินค้า เพิ่มมาใหม่
            volumn:req.body.volumn,// ปริมาณ เพิ่มมาใหม่
            term:req.body.term,// เงื่อนไข เพิ่มมาใหม่
            weight:req.body.weight,// น้ำหนัก เพิ่มมาใหม่
            transporttype:req.body.transporttype, //ประเภทขนส่ง
            freightforwarder : req.body.freightforwarder,
            totalfreightforwarder:req.body.totalfreightforwarder,
            customsclearance : req.body.customsclearance,
            totalcustomsclearance: req.body.totalcustomsclearance,
            transport : req.body.transport,
            totaltransport: req.body.totaltransport,
            transportdomestic : req.body.transportdomestic,
            totaltransportdomestic : req.body.totaltransportdomestic,
            additionalcharges : req.body.additionalcharges,
            totaladditionalcharges : req.body.totaladditionalcharges,
            remark : req.body.remark, 

            total:req.body.total,//(ราคารวมขนส่ง)
            vat:req.body.vat,//(ราคาภาษี 7 %)
            totalall:req.body.totalall, //(ราคารวม)
            team1_id:req.body.team1_id//(รหัสทีม1)
        })
        const add = await data.save();

        const datawork = new Centralwork({
            quotation_id : add._id,
            team1_id: req.body.team1_id,
            customer_id: req.body.customer_id,
        })
        const addwork = await datawork.save();
        return res.status(200).send({status:true,data:add,message:"เพิ่มข้อมูลใบเสนอราคา",centralwork:addwork})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
    
}

// //ค้นหาข้อมูลลูกค้าทั้งหมด
module.exports.getall = async (req,res) =>{
    try{    
       const get = await Quotation.find().populate('customer_id').populate('team1_id')
       if(!get){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลใบเสนอราคา"})
        }
        return res.status(200).send({status:true,data:get})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

// //ค้นหาข้อมูลลูกค้า by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const id = req.params.id
        const get = await Quotation.findById(id).populate('customer_id').populate('team1_id')
        if(!get){
             return res.status(200).send({status:false,message:"ไม่มีข้อมูลใบเสนอราคา"})
         }
         return res.status(200).send({status:true,data:get})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

// //แก้ไขข้อมูลลูกค้า
module.exports.edit = async (req, res) => {
    try{
        const id = req.params.id
        const quotation = await Quotation.findById(id)
        if(!quotation)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลใบเสนอราคา"})
        }
        const data = {
            datequotation:req.body.datequotation,//(วันที่ออกใบเสนอราคา)
	        
            commodity:req.body.commodity,// สินค้า เพิ่มมาใหม่
            volumn:req.body.volumn,// ปริมาณ เพิ่มมาใหม่
            term:req.body.term,// เงื่อนไข เพิ่มมาใหม่
            weight:req.body.weight,// น้ำหนัก เพิ่มมาใหม่
            transporttype:req.body.transporttype, //ประเภทขนส่ง
            freightforwarder : req.body.freightforwarder,
            totalfreightforwarder:req.body.totalfreightforwarder,
            customsclearance : req.body.customsclearance,
            totalcustomsclearance: req.body.totalcustomsclearance,
            transport : req.body.transport,
            totaltransport: req.body.totaltransport,
            transportdomestic : req.body.transportdomestic,
            totaltransportdomestic : req.body.totaltransportdomestic,
            additionalcharges : req.body.additionalcharges,
            totaladditionalcharges : req.body.totaladditionalcharges,
            remark : req.body.remark,

            total:req.body.total,//(ราคารวมขนส่ง)
            vat:req.body.vat,//(ราคาภาษี 7 %)
            totalall:req.body.totalall, //(ราคารวม)
        }
        const edit = await Quotation.findByIdAndUpdate(id,data,{new:true})
        return res.status(200).send({status:true,data:edit,message:"แก้ไขข้อมูลสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
    
}
// //ลบข้อมูลลูกค้า
module.exports.delete = async (req,res) =>{
    try{    
        const id = req.params.id
        const quotation = await Quotation.findById(id)
        if(!quotation)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลใบเสนอราคา"})
        }
        const deletes = await Quotation.findByIdAndDelete(id)
        const deleteworkcentral = await Centralwork.findOneAndDelete({quotation_id:id})
        return res.status(200).send({status:true,data:deletes,message:'ลบข้อมูลสำเร็จ',centralwork:deleteworkcentral})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}