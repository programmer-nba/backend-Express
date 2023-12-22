const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const quotationSchema = new mongoose.Schema(
  {
    datequotation:{type:Date,default:Date.now()},//(วันที่ออกใบเสนอราคา)
	  refno :{type:String,required:true}, //(เลขที่อ้างอิง)
	  customer_id:{type: mongoose.Schema.Types.ObjectId,ref:'customer',required:true}, //(ชื่อลูกค้า)(ดึงชื่อบริษัทมา) (ดึงข้อมูลลูกค้ามา)
    
    commodity :{type:String,default:''},// สินค้า เพิ่มมาใหม่
    volumn:{type:String,default:''},// ปริมาณ เพิ่มมาใหม่
    term:{type:String,default:''},// เงื่อนไข เพิ่มมาใหม่
    weight :{type:String,default:''},//น้ำหนัก เพิ่มมาใหม่
    transporttype:{type:[String]}, //ประเภทขนส่ง
    freightforwarder:{type:[]},
    totalfreightforwarder:{type:Number,default:0},
    customsclearance:{type:[]},
    totalcustomsclearance:{type:Number,default:0},
    transport:{type:[]},
    totaltransport:{type:Number,default:0},
    transportdomestic:{type:[]},
    totaltransportdomestic:{type:Number,default:0},
    additionalcharges:{type:[]},
    totaladditionalcharges:{type:Number,default:0},
    remark :{type:[String]},
    
    total:{type:Number},//(ราคารวมขนส่ง)
    vat:{type:Number},//(ราคาภาษี 7 %)
    totalall:{type:Number}, //(ราคารวม)
    team1_id:{type: mongoose.Schema.Types.ObjectId,ref:'team1',required:true},//(รหัสทีม1)
  },
  {timestamps: true}
);

const Quotation = mongoose.model("quotation", quotationSchema);

module.exports = Quotation;