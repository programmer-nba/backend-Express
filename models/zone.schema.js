const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const zoneSchema = new mongoose.Schema(
  {
    name :{type:String}
  },
  {timestamps: true}
);

const Zone = mongoose.model("zone", zoneSchema);

module.exports = Zone;
