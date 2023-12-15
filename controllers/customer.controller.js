const Customer =  require('../models/customer.schema')
const Team1  = require('../models/team1.schema')
//เพิ่มข้อมูลลูกค้า
module.exports.add = async (req, res) => {
    try{
        const team1 = Team1.findById(req.body.team1_id)
        if(!team1){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลteam1"})
        }
        const customerdata = new Customer({
            customername: req.body.customername,
            companyfirst: req.body.companyfirst,
            companyname: req.body.companyname,
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
        const customerdata = await Customer.find().populate("team1_id")
        if(!customerdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }
        return res.status(200).send({status:true,data:customerdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ค้นหาข้อมูลลูกค้า by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const customerdata = await Customer.findById(req.params.id).populate('team1_id')
        if(!customerdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }
        return res.status(200).send({status:true,data:customerdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ค้นหาตามคนที่นำเข้า ตาม team 1 
module.exports.getbyteam1id = async (req,res) =>{
    try{    
        const customerdata = await Customer.find({team1_id:req.params.id}).populate('team1_id')
        if(!customerdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }
        return res.status(200).send({status:true,data:customerdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}
//แก้ไขข้อมูลลูกค้า
module.exports.edit = async (req, res) => {
    try{
        const id = req.params.id
        const customers = await Customer.findById(id)
        if(!customers)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }
        const customerdata ={
            customername: req.body.customername,
            companyfirst: req.body.companyfirst,
            companyname: req.body.companyname,
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
        }

        const edit = await Customer.findByIdAndUpdate(id,customerdata,{new:true})
        return res.status(200).send({status:true,data:edit,message:"เพิ่มข้อมูลลูกค้าสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
    
}
//ลบข้อมูลลูกค้า
module.exports.delete = async (req,res) =>{
    try{    
        const id = req.params.id;
        const customerdata = await Customer.findById(id)
        if(!customerdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }
        const deletes = await Customer.findByIdAndDelete(id)
        return res.status(200).send({status:true,data:deletes})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}