const jwt = require('jsonwebtoken');

//เช็ค token team1
tokenteam1 = async (req,res,next) => {
    try{

        let token = req.headers["token"]
        const secretKey = "i#ngikanei;#aooldkhfa'"
        //เช็ค token
        if(!token){
            return res.status(403).send({status:false,message:'token หมดอายุ'});
        }
        // ทำการยืนยันสิทธิ์ token
        const decoded =  jwt.verify(token,secretKey)
        if(decoded.roles === "team1"){
            req.users = decoded.data
            next();
        }else{
            res.status(400).send({status:false,message:"คุณไม่มีสิทธิ่ในการใช้งาน"})
        }
                
    }catch (err){
        return res.status(500).send({error :err.message})
    }
};
//เช็ค token team2
tokenteam2 = async (req,res,next) => {
    try{

        let token = req.headers["token"]
        const secretKey = "i#ngikanei;#aooldkhfa'"
        //เช็ค token
        if(!token){
            return res.status(403).send({status:false,message:'token หมดอายุ'});
        }
        // ทำการยืนยันสิทธิ์ token
        const decoded =  jwt.verify(token,secretKey)
        if(decoded.roles === "team2"){
            req.users = decoded.data
            next();
        }else{
            res.status(400).send({status:false,message:"คุณไม่มีสิทธิ่ในการใช้งาน"})
        }
                
    }catch (err){
        return res.status(500).send({error :err.message})
    }
};
//เช็ค token all
all = async (req,res,next) => {
    try{

        let token = req.headers["token"]
        const secretKey = "i#ngikanei;#aooldkhfa'"
        //เช็ค token
        if(!token){
            return res.status(403).send({status:false,message:'token หมดอายุ'});
        }
        
        // ทำการยืนยันสิทธิ์ token
        const decoded =  jwt.verify(token,secretKey)
        req.users = decoded.data
        next()    
    }catch (err){
        console.log(err)
        return res.status(500).send({error:err.message})
    }
}
const authteam = {
    tokenteam1,tokenteam2,
    all
};

module.exports = authteam;