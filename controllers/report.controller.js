
const Team1 = require("../models/team1.schema")
const Team2 = require("../models/team2.schema")
const Customer = require("../models/customer.schema");
const Quotation = require("../models/quotation.schema");
module.exports.reportteam1 = async (req, res) => {

    try{
        // const team1 = await Team1.finds();
        // const team1_id = team1.map(team1=>team1._id)

        // team1 หาลูกค้าเข้ามา
        const customer = await Customer.find().populate('team1_id');
        let data =[]
        customer.map(customer => {
            const teamId = customer.team1_id._id;
            const finds = data.find(item =>item.team1_id == teamId)
            if (finds) {
                // ถ้ามีอยู่แล้ว บวกจำนวนลูกค้า
                // data[finds].countcutomer++;
            } else {
                // ถ้ายังไม่มี สร้าง key ใหม่
                data.push({
                    team1_id:teamId,
                    name:customer.team1_id.name,
                    level:customer.team1_id.level,
                    image:customer.team1_id.image,
                    countcutomer:1,
                    countquotion:0
                });
            }
        });
        // team 1 ทำใบเสนอราคา 
        const quotation = await Quotation.find().populate('team1_id');
        quotation.map(quotation => {
            const teamId = quotation.team1_id._id;
            const finds = data.find(item =>item.team1_id == teamId)
            console.log (teamId+'=')
            console.log(finds)
            if (finds) {
                // ถ้ามีอยู่แล้ว บวกจำนวนลูกค้า
                // data[finds].countquotion++;
            } else {
                // ถ้ายังไม่มี สร้าง key ใหม่
                data.push({
                    team1_id:teamId,
                    name:quotation.team1_id.name,
                    level:quotation.team1_id.level,
                    image:quotation.team1_id.image,
                    countcutomer:0,
                    countquotion:1
                });
            }
        });

        return res.status(200).send({status:true,data:data})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}