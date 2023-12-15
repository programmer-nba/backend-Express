const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const customerSchema = new mongoose.Schema(
  {
    customername: {type: String, required: true}, // ชื่อลูกค้า
    companyfirst:{type:String ,required:true}, //ชื่อต้นบริษัท
    companyname: {type: String, required: true}, //ชื่อบริษัท
    customeemail: {type: String, required: true}, //อีเมล์
    phonepersonal: {type: String, required: true},//เบอร์โทรศัพท์ส่วนตัว
    //ที่อยู่ในการออกใบกำกับภาษี
    addresstax:{type:String ,required:true}, //(ที่อยู่ใบกำกับภาษี)
    provincetax: {type:String,required:true}, //จังหวัดใบกำกับภาษี
    amphuretax: {type:String,required:true},//(อำเภอใบกำกับภาษี)
    tambontax: {type:String,required:true},//(ตำบลใบกำกับภาษี)
    telephonetax :{type:String,required:true},//(เบอร์โทรศัพท์)
    faxtax:{type:String,required:true},//(โทรสาร)
    //
    taxid: {type:String,required:true},//(เลขประจำตัวผู้เสียภาษี)
    businessregistration: {type:String,required:true},//(ทะเบียนนิติบุคคลเลขที่ )
    natureofbusiness : {type:String,required:true},//(ประเภทธุรกิจ)
    dateofincorporation :{type:Date,required:true},//(วันที่จดทะเบียน)
    capital :{type:String,required:true},//(ทุนจดทะเบียน)
    team1_id :{type: mongoose.Schema.Types.ObjectId,ref:'team1',required:true} //รหัสทีม1
  },
  {timestamps: true}
);

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
