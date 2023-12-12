const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const team2Schema = new mongoose.Schema(
  {
    username: {type: String, required: true,unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    roles:{type:String,required:true},
    level:{type:String}
  },
  {timestamps: true}
);

const Team2 = mongoose.model("team2", team2Schema);

module.exports = Team2;
