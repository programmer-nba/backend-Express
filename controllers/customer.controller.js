const Customer =  require('../models/customer.schema')

//เพิ่มข้อมูลลูกค้า
module.exports.add = async (req, res) => {
    try{
        const customerdata = new Customer({
            customername: req.body.companyname,
            companyfirst: req.body.companyfirst,
            companyname: req.body.customeemail,
            customeemail: req.body.customeemail,
            phonepersonal:req.body.phonepersonal,
            //ที่อยู่ในการออกใบกำกับภาษี
            addresstax: req.body.addresstax,
            provincetax: req.body.provincetax,
            amphuretax: req.body.amphuretax,
            tambontax:req.body.tambontax,
            telephonetax :req.body.telephonetax,
            faxtax: req.body.faxtax,
            //
            taxid: req.body.taxid,
            businessregistration: req.body.businessregistration,
            natureofbusiness : req.body.natureofbusiness,
            dateofincorporation :req.body.dateofincorporation,
            capital :req.body.capital,
            team1_id:req.body.team1_id,
        }) 
        const add = await customerdata.save();
        return res.status(200).send({status:true,data:add,message:"เพิ่มข้อมูลลูกค้าสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
    
}

//ค้นหาข้อมูลลูกค้าทั้งหมด
module.exports.getall = async (req,res) =>{
    try{    
        const customerdata = await Customer.find()
        if(!customerdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }
        return res.status(200).send({status:true,data:customerdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ค้นหาข้อมูล by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const customerdata = await Customer.findById(req.params.id)
        if(!customerdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }
        return res.status(200).send({status:true,data:customerdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}