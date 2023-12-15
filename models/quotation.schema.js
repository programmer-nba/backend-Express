const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const quotationSchema = new mongoose.Schema(
  {
    datequotation:{type:Date,default:Date.now()},//(วันที่ออกใบเสนอราคา)
	  refno :{type:String,required:true}, //(เลขที่อ้างอิง)
	  customer_id:{type: mongoose.Schema.Types.ObjectId,ref:'customer',required:true}, //(ชื่อลูกค้า)(ดึงชื่อบริษัทมา) (ดึงข้อมูลลูกค้ามา)
	  listitem :{type:[{ //(รายการขนส่ง)
      description :{type:String}, //(รายละเอียดการขนส่ง)
		  per:{type:String},//(การขนส่ง เช่น ส่งทางเรือ ,kgm เป็นต้น)
		  chargesratethb :{type:Number},//(ราคา)
    }]},
    total:{type:Number},//(ราคารวมขนส่ง)
    vat:{type:Number},//(ราคาภาษี 7 %)
    totalall:{type:Number}, //(ราคารวม)
    team1_id:{type: mongoose.Schema.Types.ObjectId,ref:'team1',required:true},//(รหัสทีม1)
  },
  {timestamps: true}
);

const Quotation = mongoose.model("quotation", quotationSchema);

module.exports = Quotation;