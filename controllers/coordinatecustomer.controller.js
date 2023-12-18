const Coordinatecustomers = require('../models/coordinatecustomers.schema')
const Centralwork = require('../models/centralwork.schema')

module.exports.add = async (req, res) => {
    try {
        const datacentralwork = await Centralwork.findById(req.body.centralwork_id)
        if(!datacentralwork)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลการดีลงานกลาง"})
        }

        const data = new Coordinatecustomers({
            centralwork_id: req.body.centralwork_id,
            status:req.body.status,
            possibility:req.body.possibility,
            note:req.body.note,
            statuswork:req.body.statuswork
        })
        const add = await data.save()
        
        const editdata = {
            coordinatecustomers_id:add._id
        }
        const edit = await Centralwork.findByIdAndUpdate(datacentralwork._id,{$push:{coordinatecustomers:editdata}},{new:true})
        res.status(200).send({status:true,message:"คุณได้รับงานดีลเรียบร้อย",data:add,centralwork:edit});
      } catch (error) {
        return res.status(500).send({status:false,error:error.message});
      }    
};

module.exports.getall = async (req,res) =>{
    try{    
        const coordinatecustomersdata = await Coordinatecustomers.find().populate({ 
            path: "centralwork_id", 
            populate: [
              { path: "quotation_id" },
              { path: "team1_id" },
              { path: "team2_id" },
              { path: "customer_id" }, 
            ]
          });
        if(!coordinatecustomersdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }
        return res.status(200).send({status:true,data:coordinatecustomersdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ค้นหาข้อมูลการดีลงานกลาง by id
module.exports.getbyid = async (req,res) =>{
    try{
        const id = req.params.id    
        const coordinatecustomersdata = await Coordinatecustomers.findById(id).populate({ 
            path: "centralwork_id", 
            populate: [
              { path: "quotation_id" },
              { path: "team1_id" },
              { path: "team2_id" },
              { path: "customer_id" }, 
            ]
          });
        if(!coordinatecustomersdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลลูกค้า"})
        }
        return res.status(200).send({status:true,data:coordinatecustomersdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}


module.exports.delete = async (req,res) =>{
    try{    
        const id = req.params.id
        const coordinatecustomersdata = await Coordinatecustomers.findById(id).populate('centralwork_id')
        if(!coordinatecustomersdata)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลข้อมูลการดีลงานกับลูกค้า"})
        }
        const deletecoord_id = coordinatecustomersdata.centralwork_id.coordinatecustomers.filter(item=> item != id)
        const edit = await Coordinatecustomers.findByIdAndUpdate(coordinatecustomersdata._id,{coordinatecustomers:deletecoord_id},{new:true})
        const deletes = await Coordinatecustomers.findByIdAndDelete(id)
        return res.status(200).send({status:true,data:deletes,message:'ลบข้อมูลสำเร็จ',centralwork_id:edit})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}