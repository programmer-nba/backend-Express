const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const team_byteam2Schema = new mongoose.Schema(
  {
    name:{type:String},//(ชื่อทีม)
	zone:{type:[{
        zoneid:{type: mongoose.Schema.Types.ObjectId,ref:'zone'}
    }]}
  },
  {timestamps: true}
);

const Team_byteam2 = mongoose.model("team_byteam2", team_byteam2Schema);

module.exports = Team_byteam2;