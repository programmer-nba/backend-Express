const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const team1Schema = new mongoose.Schema(
  {
    username: {type: String, required: true,unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    roles:{type:String,required:true},
    level:{type:String},
    image:{type:String},
    team_byteam1 :{type: mongoose.Schema.Types.ObjectId,ref:'team_byteam1',default: null}
  },
  {timestamps: true}
);

const Team1 = mongoose.model("team1", team1Schema);

module.exports = Team1;
