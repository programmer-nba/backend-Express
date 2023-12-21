const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const customerSchema = new mongoose.Schema(
  {
    customername: {type: String, required: true}, // ชื่อลูกค้า
    companyfirst:{type:String ,required:true}, //ชื่อต้นบริษัท
    companyname: {type: String, required: true,unique: true}, //ชื่อบริษัท
    customeemail: {type: String, required: true}, //อีเมล์
    phonepersonal: {type: String, required: true},//เบอร์โทรศัพท์ส่วนตัว
    //ที่อยู่ในการออกใบกำกับภาษี
    addresstax:{type:String,default: null}, //(ที่อยู่ใบกำกับภาษี)
    provincetax: {type:String,default: null}, //จังหวัดใบกำกับภาษี
    amphuretax: {type:String,default: null},//(อำเภอใบกำกับภาษี)
    tambontax: {type:String,default: null},//(ตำบลใบกำกับภาษี)
    telephonetax :{type:String,default: null},//(เบอร์โทรศัพท์)
    faxtax:{type:String,default: null},//(โทรสาร)
    //
    taxid: {type:String,unique: true},//(เลขประจำตัวผู้เสียภาษี)
    businessregistration: {type:String,unique: true},//(ทะเบียนนิติบุคคลเลขที่ )
    natureofbusiness : {type:String,default: null},//(ประเภทธุรกิจ)
    dateofincorporation :{type:Date,default: null},//(วันที่จดทะเบียน)
    capital :{type:String,default: null},//(ทุนจดทะเบียน)
    //รายเอียด การดีลงาน
    workloadmonth :{type:String,default: null}, //(ปริมาณงาน/เดือน)
	  opportunity :{type:String,default: null},//(โอกาสในการปิดงาน)
    forcastpercent :{type:String,default: null}, //(Forcast/ %)
    forcastcupboard :{type:String,default: null},//(Forcast/ตู้)
	  note:{type:String,default: null}, //หมายเหตุ
    team1_id :{type: mongoose.Schema.Types.ObjectId,ref:'team1',default: null} //รหัสทีม1
  },
  {timestamps: true}
);

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
