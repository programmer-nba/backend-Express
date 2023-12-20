
const Team1 = require("../models/team1.schema")
const Team2 = require("../models/team2.schema")
const Customer = require("../models/customer.schema");
const Quotation = require("../models/quotation.schema");
const Centralwork = require("../models/centralwork.schema")
module.exports.reportteam1 = async (req, res) => {

    try{
        // const team1 = await Team1.finds();
        // const team1_id = team1.map(team1=>team1._id)

        // team1 หาลูกค้าเข้ามา
        const customer = await Customer.find().populate('team1_id');
        let data =[]
        customer.map(customer => {
            const teamId = customer.team1_id._id;
            const finds = data.findIndex(item =>JSON.parse(JSON.stringify(item.team1_id)) == teamId)
            if (finds != -1) {
                // ถ้ามีอยู่แล้ว บวกจำนวนลูกค้า
                data[finds].countcutomer++;
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
            const finds = data.findIndex(item => JSON.parse(JSON.stringify(item.team1_id)) ==teamId)
            console.log (teamId+'=')
            console.log(finds)
            if (finds != -1) {
                // ถ้ามีอยู่แล้ว บวกจำนวนลูกค้า
                data[finds].countquotion++;
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


module.exports.reportteam2 = async (req, res) => {

    try{
        const data = []
        const team2 = await Team2.find()
        team2.map(team2 => {
                // ถ้ายังไม่มี สร้าง key ใหม่
                data.push({
                    team2_id:team2._id,
                    name:team2.name,
                    level:team2.level,
                    image:team2.image,
                    countaddwork:0,
                    countclosework:0,
                    countpass:0,
                    countnotpass:0,
                    countprice:0
                });
        });
        const centralwork = await Centralwork.find().populate("quotation_id").populate("team2_id").populate("coordinatecustomers.coordinatecustomers_id");
        centralwork.map(item=>{
            const team2id_item = item.team2_id._id;
            //รับงานมาเท่าไหร่
            const finds = data.findIndex(item => JSON.parse(JSON.stringify(item.team2_id)) == item.team2_id._id)
            if(finds !=-1)
            {
                data[finds].countaddwork++;
            }
            //ปิดงานไปเท่าไหร่
            if(item.coordinatecustomers.slice(-1)[0].coordinatecustomers_id.statuswork =="ผ่าน" ||item.coordinatecustomers.slice(-1)[0].coordinatecustomers_id.statuswork =="ไม่ผ่าน")
            {
                data[finds].countclosework++;
            }
            // ขายผ่าน //ยอดราคาที่ปิดงานได้
            if(item.coordinatecustomers.slice(-1)[0].coordinatecustomers_id.statuswork =="ผ่าน")
            {
                data[finds].countpass++;
                data[finds].countprice = data[finds].countprice + item.quotation_id.totalall               
            }
            //ขายไม่ผ่าน
            if(item.coordinatecustomers.slice(-1)[0].coordinatecustomers_id.statuswork =="ไม่ผ่าน")
            {
                data[finds].countnotpass++;
            }
            

        })

        return res.status(200).send({status:true,data:data})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}
