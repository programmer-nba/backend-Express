const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const team_byteam1Schema = new mongoose.Schema(
  {
    name:{type:String},//(ชื่อทีม)
	zone:{type:[{
        zoneid:{type: mongoose.Schema.Types.ObjectId,ref:'zone'}
    }]}
  },
  {timestamps: true}
);

const Team_byteam1 = mongoose.model("team_byteam1", team_byteam1Schema);

module.exports = Team_byteam1;