const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const customerSchema = new mongoose.Schema(
  {
    customername: {type: String, required: true}, // ชื่อลูกค้า
    companyfirst:{type:String ,required:true}, //ชื่อต้นบริษัท
    companyname: {type: String, required: true,unique: true}, //ชื่อบริษัท
    customeemail: {type: String, required: true}, //อีเมล์
   
    //ที่อยู่ในการออกใบกำกับภาษี
    addresstax:{type:String,default: null}, //(ที่อยู่ใบกำกับภาษี)
    provincetax: {type:String,default: null}, //จังหวัดใบกำกับภาษี
    amphuretax: {type:String,default: null},//(อำเภอใบกำกับภาษี)
    tambontax: {type:String,default: null},//(ตำบลใบกำกับภาษี)
    zipcodetax:{type:String,default:null}, // ไปรษณีย์ เพิ่มมาใหม่
    telephonetax :{type:String,default: null},//(เบอร์โทรศัพท์)
    faxtax:{type:String,default: null},//(โทรสาร)
    //ที่อยู่ในการส่งเอกสาร
    address:{type:String,default: null},// (ที่อยู่ใบกำกับภาษี) เพิ่มมา/
    province:{type:String,default: null},// (จังหวัดใบกำกับภาษี)เพิ่มมา/
    amphure: {type:String,default: null},// (อำเภอใบกำกับภาษี)เพิ่มมา/
    tambon:{type:String,default: null},//(ตำบลใบกำกับภาษี)เพิ่มมา/
    zipcode :{type:String,default: null}, // (ไปรษณีย์) เพิ่มมา/
    telephone :{type:String,default: null},//(เบอร์โทรศัพท์)
    fax: {type:String,default: null},//(โทรสาร)เพิ่มมา/
    phonepersonal: {type: String, required: true},//เบอร์โทรศัพท์ส่วนตัว
    //
    taxid: {type:String,unique: true},//(เลขประจำตัวผู้เสียภาษี)
    businessregistration: {type:String,unique: true},//(ทะเบียนนิติบุคคลเลขที่ )
    natureofbusiness : {type:String,default: null},//(ประเภทธุรกิจ)
    dateofincorporation :{type:Date,default: null},//(วันที่จดทะเบียน)
    capital :{type:String,default: null},//(ทุนจดทะเบียน)
    //ข้อมูลด้านธนาคาร 
    nameofbank:{type:String,default: null}, //ชื่อธนาคาร
	  accountno:{type:String,default: null},//(เลขที่บัญชี)
	  branch :{type:String,default: null}, //(สาขา)
	  contactperson:{type:String,default:null},
	  tel:{type:String,default: null},
	  facilities:{type:String,default: null},
	  credit:{type:String,default: null},
    //เงื่อนไขการวางบิลและรับเช็ค
    billdate:{type:String,default: null}, //กำหนดวันรับวางบิล:
	  namebill:{type:String,default: null}, //ชื่อ-สกุลบุคคลที่รับวางบิล
	  countcredits:{type:String,default: null},// การนับเครดิต:
	  othercountcredits:{type:String,default: null}, // การนับเครดิตอื่น
	  paymentstype:{type:String,default: null}, //กำหนดการรับชำระเงิน:
	  setdatebillandcredits:{type:String,default: null},//กำหนดการรับเช็ค/โอนเงิน ทุกวันที่ :
	  contactbill:{type:String,default: null}, //บุคคลที่ติดต่อเรื่องการรับชำระเงิน  
	  tellbill:{type:String,default: null}, 
	  //ส่วนของบริษัท พิจารณาการขอเครดิต
	  approvalcredit: {type:String,default: null},//การอนุมัติการขอเครดิต 
    limitcredit:{type:String,default: null},// วงเงินเครดิตที่ได้รับอนุมัติ บาท
	  datecredit:{type:String,default: null},// จำนวนวัน
	  employeename:{type:String,default: null},
	  notecredit:{type:String,default: null}, //เหตุผลการพิจารณา :
    //
    team1_id :{type: mongoose.Schema.Types.ObjectId,ref:'team1',default: null} //รหัสทีม1
  },
  {timestamps: true}
);

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
