var express = require('express');
var router = express.Router();

const Admin = require('../models/admin.schema')
const Team1 = require('../models/team1.schema')
const Team2 = require('../models/team2.schema')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const team = require('../authentication/teamAuth')
router.post('/', async(req,res)=>{
    try {
        if(req.body.username === undefined || req.body.username ==='')
        {
            return res.status(200).send({ status: false, message: "กรุณากรอก username" })
        }
        if(req.body.password === undefined || req.body.password ==='')
        {
            return res.status(200).send({ status: false, message: "กรุณากรอก password" })
        }
        const username = req.body.username
        const password = req.body.password
        ///
        const [checksignin,roles] = await checklogin(username,password).then((data)=>{
            return data
          })
          if(checksignin === "คุณกรอกรหัสไม่ถูกต้อง"){
            return res.status(200).send({ status: false, message: "คุณกรอกรหัสไม่ถูกต้อง" });
          } else if(checksignin === "Invalid Password"){
            return res.status(200).send({ status: false, message: "พาสเวิร์ดไม่ถูกต้อง Password" })
          }

         //สร้าง signaturn
         const payload = {
          _id:checksignin._id,
          name: checksignin.name,
          username:checksignin.username,
          roles:roles,
          level:checksignin.level
         }
         const secretKey = process.env.SECRET_KEY
         const token = jwt.sign(payload,secretKey,{expiresIn:"4h"})
        return res.status(200).send({ status: true, data: payload, token: token})
      } catch (error) {
        return res.status(500).send({status:false,error:error.message});
      }     
})
router.get('/me',team.all, async(req,res)=>{
    try {  
        const token = req.headers['token'];
        if(!token){
            return res.status(200).send({status:false,message:'Not authorized'});
        }
    
        const decodded =jwt.verify(token,process.env.SECRET_KEY)
        const dataResponse = {
          _id:decodded._id,
          name: decodded.name,
          username:decodded.username,
          roles:decodded.roles,
          level:decodded.level
        }
      return res.status(200).send({status:true,data:dataResponse});
    } catch (error) {
          console.log(error);
          return res.status(500).send({status:false,error:error.message});
    }
})

async function checklogin(username,password){
    let bcryptpassword = ""
    const Admindata = await Admin.findOne({username:username})
    const Team1data = await Team1.findOne({username:username})
    const Team2data = await Team2.findOne({username:username})
    // เช็คค่า Member มีหรือเปล่า
    if(Team1data != null){
        //เช็คค่า password ว่าในฐานข้อมูลตรงกันหรือเปล่า
       bcryptpassword = await bcrypt.compare(password,Team1data.password)
  
        if(bcryptpassword){
          return  [Team1data,"team1"]
        }
        else{
          return ["Invalid Password",""]
        }
    }else if(Team2data != null){
        //เช็คค่า password ว่าในฐานข้อมูลตรงกันหรือเปล่า
       bcryptpassword = await bcrypt.compare(password,Team2data.password)
  
        if(bcryptpassword){
          return  [Team2data,"team2"]
        }
        else{
          return ["Invalid Password",""]
        }
    }
    else if(Admindata!= null){
      bcryptpassword = await bcrypt.compare(password,Admindata.password)
        if(bcryptpassword){
          return [Admindata,"admin"]
        }else{
          return ["Invalid Password",""]
        }
    }else{
      return  ["คุณกรอกรหัสไม่ถูกต้อง",""]
    }
    
  
}

module.exports = router;