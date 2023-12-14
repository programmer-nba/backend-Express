const Team2 = require('../models/team2.schema')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
//เรียกใช้ function เช็คชื่อซ้ำ
const checkalluser = require("../functions/check-alluser")
const multer = require("multer");
const {uploadFileCreate,deleteFile} = require('../functions/uploadfilecreate');

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
     //console.log(file.originalname);
  },
});
//สร้างไอดี team2
module.exports.add = async (req, res) => {
    try {
        if(req.body.username=== undefined || req.body.username ==='')
        {
            return  res.status(200).send({status:false,message:"กรุณากรอก username"});
        }
        if(req.body.password=== undefined || req.body.password === '')
        {
            return  res.status(200).send({status:false,message:"กรุณากรอก password"});
        }
        if(req.body.name=== undefined || req.body.name ==='')
        {
            return  res.status(200).send({status:false,message:"กรุณากรอก name"});
        }
        if(req.body.level=== undefined || req.body.level ==='')
        {
            return res.status(200).send({status:false,message:"กรุณากรอกระดับของทีม"});
        }
         //เช็คชื่อซ้ำ
        const Check = await checkalluser.Checkusername(req.body.username).then((status)=>{
            return status
        })
        if(Check === true){
            return res.status(200).send({status:false,message:`username ${req.body.username} ซ้ำ กรุณาเปลี่ยนใหม่`})
        }
        
        const data = new Team2({
            username:req.body.username,
            password:bcrypt.hashSync(req.body.password, 10),
            name:req.body.name,
            roles:"team2",
            level:req.body.level
        })
        const add = await data.save()
        res.status(200).send({status:true,message:"คุณได้สร้างไอดี team2 เรียบร้อย",data:add});
      } catch (error) {
        return res.status(500).send({status:false,error:error.message});
      }    
};

//ดึงข้อมูลทั้งหมด
module.exports.getall = async (req,res) =>{
    try{    
        const team2data = await Team2.find()
        if(!team2data){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล team2"})
        }
        return res.status(200).send({status:true,data:team2data})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ดึงข้อมูล by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const team2data = await Team2.findOne({_id:req.params.id})
        if(!team2data){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล team2"})
        }
        return res.status(200).send({status:true,data:team2data})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//แก้ไขข้อมูล team2
module.exports.edit = async (req,res) =>{
    try{    
        if(req.body.username=== undefined || req.body.username ==='')
        {
            return res.status(200).send({status:false,message:"กรุณากรอก username"});
        }
        if(req.body.name=== undefined || req.body.name ==='')
        {
            return res.status(200).send({status:false,message:"กรุณากรอก name"});
        }
        if(req.params.id === undefined || req.params.id ==='')
        {
            return res.status(200).send({status:false,message:"กรุณาส่ง id มาใน paramsด้วย"});
        }
        if(req.body.level === undefined || req.body.level ==='')
        {
            return res.status(200).send({status:false,message:"กรุณากรอกระดับสมาชิก"});   
        }

        const team2 = await Team2.findOne({_id:req.params.id})
        if(!team2)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล team2"})
        }

        if(team2.username !=req.body.username){
             //เช็คชื่อซ้ำ
            const Check = await checkalluser.Checkusername(req.body.username).then((status)=>{
                return status
            })
            if(Check === true){
                return res.status(200).send({status:false,message:`username ${req.body.username} ซ้ำ กรุณาเปลี่ยนใหม่`})
            }
        }
        const changesimage = (req.body.changesimage!= undefined && req.body.changesimage!=""? req.body.changesimage:false)
        if(changesimage === true)
        { 
            if(team2.image!='')
            {
                await deleteFile(team2.image);  
                const deletesignature =await Team2.findByIdAndUpdate(req.params.id,{image:""})
            }
        }
        const data ={
            username: req.body.username,
            password: ( req.body.password!= undefined && req.body.password!= ""? bcrypt.hashSync(req.body.password, 10):team2.password),
            name:req.body.name,
            level:req.body.level
        }
        const edit = await Team2.findByIdAndUpdate(req.params.id,data,{new:true})
        return res.status(200).send({status:true,data:edit,message:"แก้ไขข้อมูลสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ลบข้อมูล team2
module.exports.delete = async (req,res) =>{
    try{    
        const team2data = await Team2.findOne({_id:req.params.id})
        if(!team2data){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล team2"})
        }
        const deleteteam2 = await Team2.findByIdAndDelete(req.params.id)
        return res.status(200).send({status:true,message:"ลบข้อมูลสำเร็จ",data:deleteteam2})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//รูปภาพ
module.exports.image = async (req,res) =>{
    console.log(req.body);
    const id = req.params.id
    try {

    const team2 = await Team2.findById(id);
    if(!team2){
      return res.status(200).send(`team2 id ${id} not found`);
    }
    let upload = multer({ storage: storage }).array("pic", 20);
    upload(req, res, async function (err) {
      const reqFiles = [];
      const result=[];

      if(err){
        return res.status(500).send(err);
      }

      if (!req.files) {
        res.status(200).send({ message: "มีบางอย่างผิดพลาด", status: false });
      } else {
        const url = req.protocol + "://" + req.get("host");
        for (var i = 0; i < req.files.length; i++) {
        const src =  await uploadFileCreate(req.files, res, { i, reqFiles });
            result.push(src);
        
          //   reqFiles.push(url + "/public/" + req.files[i].filename);

        }

        let edit = ""
        if(result){
          
          edit = await Team2.findByIdAndUpdate(id,{image:reqFiles[0]},{returnOriginal:false})
        }

        res.status(201).send({
          message: "สร้างรูปภาพเสร็จเเล้ว",
          status: true,
          data: edit ,
          file: reqFiles,
          result:result
        });
      }
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, status: false });
  }
}

//ลบรูปภาพ
module.exports.deleteimage = async (req,res) =>{
    const id = req.params.id;
    const image = req.params.image;
  
    try {
  
      const team2 = await Team2.findById(id);
  
      if(!team2){
        return res.status(200).send(`team2 ${id} not found`);
      }
  
      await deleteFile(image);
      const deleteimages= await Team2.findByIdAndUpdate(id,{image:""},{returnOriginal:false})
      return res.status(200).send({message:true,data:deleteimages,message:"ลบภาพสำเร็จ"});
    } catch (error) {
      return res.status(500).send({ message: error.message, status: false });
    }
}
