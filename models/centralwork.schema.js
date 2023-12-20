const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const centralworkSchema = new mongoose.Schema(
  {
  quotation_id : {type: mongoose.Schema.Types.ObjectId,ref:'quotation',required:true},
	team1_id:{type: mongoose.Schema.Types.ObjectId,ref:'team1',required:true},
	team2_id:{type: mongoose.Schema.Types.ObjectId,ref:'team2'},
	customer_id: {type: mongoose.Schema.Types.ObjectId,ref:'customer',required:true},
	datepull :{type:Date},
	coordinatecustomers:{type:[{
        coordinatecustomers_id : {type: mongoose.Schema.Types.ObjectId,ref:'coordinatecustomers'},
    }]}
  },
  {timestamps: true}
);

const Centralwork = mongoose.model("centralwork", centralworkSchema);

module.exports = Centralwork;
