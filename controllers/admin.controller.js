const Admin = require('../models/admin.schema')
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

//สร้างไอดี admin
module.exports.add = async (req, res) => {
    try {
        if(req.body.username=== undefined || req.body.username ==='')
        {
            return res.status(200).send({status:false,message:"กรุณากรอก username"});
        }
        if(req.body.password=== undefined || req.body.password === '')
        {
            return res.status(200).send({status:false,message:"กรุณากรอก password"});
        }
        if(req.body.name=== undefined || req.body.name ==='')
        {
            return res.status(200).send({status:false,message:"กรุณากรอก name"});
        }
         //เช็คชื่อซ้ำ
        const Check = await checkalluser.Checkusername(req.body.username).then((status)=>{
            return status
        })
        if(Check === true){
            return res.status(200).send({status:false,message:`username ${req.body.username} ซ้ำ กรุณาเปลี่ยนใหม่`})
        }
        
        const data = new Admin({
            username:req.body.username,
            password:bcrypt.hashSync(req.body.password, 10),
            name:req.body.name,
            roles:"admin"
        })
        const add = await data.save()
        res.status(200).send({status:true,message:"คุณได้สร้างไอดี admin เรียบร้อย",data:add});
      } catch (error) {
        return res.status(500).send({status:false,error:error.message});
      }    
};

//ดึงข้อมูลทั้งหมด
module.exports.getall = async (req,res) =>{
    try{    
        const admindata = await Admin.find()
        if(!admindata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูล admin"})
        }
        return res.status(200).send({status:true,data:admindata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ดึงข้อมูล by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const admindata = await Admin.findOne({_id:req.params.id})
        if(!admindata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูล admin"})
        }
        return res.status(200).send({status:true,data:admindata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//แก้ไขข้อมูล admin
module.exports.edit = async (req,res) =>{
    try{    
        if(req.body.username=== undefined || req.body.username ==='')
        {
            return  res.status(200).send({status:false,message:"กรุณากรอก username"});
        }
        if(req.body.name=== undefined || req.body.name ==='')
        {
            return res.status(200).send({status:false,message:"กรุณากรอก name"});
        }
        if(req.params.id === undefined || req.params.id ==='')
        {
            return res.status(200).send({status:false,message:"กรุณาส่ง id มาใน paramsด้วย"});
        }
        const admin = await Admin.findOne({_id:req.params.id})
        if(!admin)
        {
            return res.status(404).send({status:false,message:"ไม่มีข้อมูล admin"})
        }
        const changesimage = (req.body.changesimage!= undefined && req.body.changesimage!=""? req.body.changesimage:false)
        if(changesimage === true)
        { 
            if(admin.image!='')
            {
                await deleteFile(admin.image);  
                const deletesignature =await Admin.findByIdAndUpdate(req.params.id,{image:""})
            }
        }
        if(admin.username !=req.body.username){
             //เช็คชื่อซ้ำ
            const Check = await checkalluser.Checkusername(req.body.username).then((status)=>{
                return status
            })
            if(Check === true){
                return res.status(200).send({status:false,message:`username ${req.body.username} ซ้ำ กรุณาเปลี่ยนใหม่`})
            }
        }

        const data ={
            username: req.body.username,
            password: ( req.body.password!= undefined && req.body.password!= ""? bcrypt.hashSync(req.body.password, 10):admin.password),
            name:req.body.name
        }
        const edit = await Admin.findByIdAndUpdate(req.params.id,data,{new:true})
        return res.status(200).send({status:true,data:edit,message:"แก้ไขข้อมูลสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ลบข้อมูล admin
module.exports.delete = async (req,res) =>{
    try{    
        const admindata = await Admin.findOne({_id:req.params.id})
        if(!admindata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล admin"})
        }
        if(admindata.image != "")
        {
            await deleteFile(admindata.image); 
        } 
        const deleteadmin = await Admin.findByIdAndDelete(req.params.id)
        return res.status(200).send({status:true,message:"ลบข้อมูลสำเร็จ",data:deleteadmin})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}



//รูปภาพ
module.exports.image = async (req,res) =>{
    console.log(req.body);
    const id = req.params.id
    try {

    const admin = await Admin.findById(id);
    if(!admin){
      return res.status(200).send(`admin id ${id} not found`);
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
          
          edit = await Admin.findByIdAndUpdate(id,{image:reqFiles[0]},{returnOriginal:false})
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
  
      const admin = await Admin.findById(id);
  
      if(!admin){
        return res.status(200).send(`admin ${id} not found`);
      }
  
      await deleteFile(image);
      const deleteimages= await Admin.findByIdAndUpdate(id,{image:""},{returnOriginal:false})
      return res.status(200).send({message:true,data:deleteimages,message:"ลบภาพสำเร็จ"});
    } catch (error) {
      return res.status(500).send({ message: error.message, status: false });
    }
}
