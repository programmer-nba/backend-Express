const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const coordinatecustomersSchema = new mongoose.Schema(
  {
    centralwork_id:{type: mongoose.Schema.Types.ObjectId,ref:'centralwork',required:true},
    status:{type:String},  //(สถานะการขาย)  (กรอกเองได้) (เช่น ปิดการขาย//เริ่มงานแล้ว , รอคุยเจ้านาย//ติดต่อใหม่วันจันทร์หน้า)
    possibility:{type:Number}, //(ความเป็นไปได้ในการปิดงาน)
    note:{type:String},//(หมายเหตุ)
    statuswork :{type:String}//(สถานะงาน) (รอสถานะการขาย) (ผ่าน) (ไม่ผ่าน)
  },
  {timestamps: true}
);

const Coordinatecustomers = mongoose.model("coordinatecustomers", coordinatecustomersSchema);

module.exports = Coordinatecustomers;
