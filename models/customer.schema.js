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
    addresstax:{type:String}, //(ที่อยู่ใบกำกับภาษี)
    provincetax: {type:String}, //จังหวัดใบกำกับภาษี
    amphuretax: {type:String},//(อำเภอใบกำกับภาษี)
    tambontax: {type:String},//(ตำบลใบกำกับภาษี)
    telephonetax :{type:String},//(เบอร์โทรศัพท์)
    faxtax:{type:String},//(โทรสาร)
    //
    taxid: {type:String,unique: true},//(เลขประจำตัวผู้เสียภาษี)
    businessregistration: {type:String,unique: true},//(ทะเบียนนิติบุคคลเลขที่ )
    natureofbusiness : {type:String},//(ประเภทธุรกิจ)
    dateofincorporation :{type:Date},//(วันที่จดทะเบียน)
    capital :{type:String},//(ทุนจดทะเบียน)
    //รายเอียด การดีลงาน
    workloadmonth :{type:String}, //(ปริมาณงาน/เดือน)
	  opportunity :{type:String},//(โอกาสในการปิดงาน)
    forcastpercent :{type:String}, //(Forcast/ %)
    forcastcupboard :{type:String},//(Forcast/ตู้)
	  note:{type:String}, //หมายเหตุ
    team1_id :{type: mongoose.Schema.Types.ObjectId,ref:'team1',required:true} //รหัสทีม1
  },
  {timestamps: true}
);

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
