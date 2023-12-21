const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const centralworkSchema = new mongoose.Schema(
  {
  quotation_id : {type: mongoose.Schema.Types.ObjectId,ref:'quotation',default: null},
	team1_id:{type: mongoose.Schema.Types.ObjectId,ref:'team1',default: null},
	team2_id:{type: mongoose.Schema.Types.ObjectId,ref:'team2',default: null},
	customer_id: {type: mongoose.Schema.Types.ObjectId,ref:'customer',default: null},
	datepull :{type:Date,default:null},
	coordinatecustomers:{type:[{
        coordinatecustomers_id : {type: mongoose.Schema.Types.ObjectId,ref:'coordinatecustomers'},
    }]}
  },
  {timestamps: true}
);

const Centralwork = mongoose.model("centralwork", centralworkSchema);

module.exports = Centralwork;
