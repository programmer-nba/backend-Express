const Customer =  require('../models/customer.schema')
const Team1  = require('../models/team1.schema')
const Centralwork = require('../models/centralwork.schema')
//เพิ่มข้อมูลลูกค้า
module.exports.add = async (req, res) => {
    try{
        const companyname = await Customer.findOne({companyname:req.body.companyname})
       
        if(companyname)
        {
            return res.status(200).send({status:false,message:`ชื่อบริษัท ${req.body.companyname}ซ้ำกัน ไม่สามารถเพิ่มได้ `})
        }

        const taxid = await Customer.findOne({taxid:req.body.taxid})
        if(taxid)
        {
            return res.status(200).send({status:false,message:`ชื่อบริษัท ${req.body.taxid}ซ้ำกัน ไม่สามารถเพิ่มได้ `})
        }
        const businessregistration = await Customer.findOne({businessregistration:req.body.businessregistration})
        if(businessregistration)
        {
            return res.status(200).send({status:false,message:`ชื่อบริษัท ${req.body.taxid}ซ้ำกัน ไม่สามารถเพิ่มได้ `})
        }
        const customerdata = new Customer({
            customername: req.body.customername,
            companyfirst: req.body.companyfirst,
            companyname: req.body.companyname,
            customeemail: req.body.customeemail,
            //ที่อยู่ในการออกใบกำกับภาษี
            addresstax: req.body.addresstax,
            provincetax: req.body.provincetax,
            amphuretax: req.body.amphuretax,
            tambontax:req.body.tambontax,
            zipcodetax:req.body.zipcodetax,
            telephonetax :req.body.telephonetax,
            faxtax: req.body.faxtax,
            //ที่อยู่ในการส่งเอกสาร  
            address: req.body.address, //(ที่อยู่ใบกำกับภาษี) เพิ่มมา/
            province: req.body.province, //(จังหวัดใบกำกับภาษี)เพิ่มมา/
            amphure: req.body.amphure,//(อำเภอใบกำกับภาษี)เพิ่มมา/
            tambon: req.body.tambon,//(ตำบลใบกำกับภาษี)เพิ่มมา/
            zipcode : req.body.zipcode, //(ไปรษณีย์) เพิ่มมา/
            telephone :req.body.telephone,//(เบอร์โทรศัพท์)
            fax: req.body.fax, //(โทรสาร)เพิ่มมา/
            phonepersonal:req.body.phonepersonal,


            taxid: req.body.taxid,
            businessregistration: req.body.businessregistration,
            natureofbusiness : req.body.natureofbusiness,
            dateofincorporation :req.body.dateofincorporation,
            capital :req.body.capital,
            //ข้อมูลด้านธนาคารเพิ่มมา/
	        nameofbank :req.body.nameofbank,//ชื่อธนาคาร
	        accountno:req.body.accountno,//(เลขที่บัญชี)
	        branch : req.body.branch, //(สาขา)
	        contactperson: req.body.contactperson,
	        tel: req.body.tel,
	        facilities: req.body.facilities,
	        credit: req.body.credit,
	        //เงื่อนไขการวางบิลและรับเช็คเพิ่มมา/
	        billdate: req.body.billdate, //กำหนดวันรับวางบิล:
	        namebill: req.body.namebill, // ชื่อ-สกุลบุคคลที่รับวางบิล
	        countcredits: req.body.countcredits, //การนับเครดิต
	        othercountcredits: req.body.othercountcredits, //การนับเครดิตอื่น
	        paymentstype: req.body.paymentstype, //กำหนดการรับชำระเงิน:
	        setdatebillandcredits:req.body.setdatebillandcredits,   //กำหนดการรับเช็ค/โอนเงิน ทุกวันที่ :
	        contactbill: req.body.contactbill, //บุคคลที่ติดต่อเรื่องการรับชำระเงิน  
	        tellbill: req.body.tellbill,//โทร 
	        //ส่วนของบริษัท พิจารณาการขอเครดิต
	        approvalcredit: req.body.approvalcredit, //การอนุมัติการขอเครดิต 
            limitcredit: req.body.limitcredit, //วงเงินเครดิตที่ได้รับอนุมัติ บาท
	        datecredit: req.body.datecredit,//จำนวนวัน
	        employeename: req.body.employeename, //พนักงานขาย
	        notecredit: req.body.notecredit,//เหตุผลการพิจารณา 

            //แก้ไขไม่ต้องเอาไป
            team1_id:req.body.team1_id,
            
        }) 
        const add = await customerdata.save();
        const datawork = new Centralwork({ 
            customer_id: add._id,
            team1_id:req.body.team1_id,
            dateexpirationteam1: new Date(Date.now()+ (31 * 24 * 60 * 60 * 1000))
        })
        const addwork = await datawork.save();
        return res.status(200).send({status:true,data:add,message:"เพิ่มข้อมูลลูกค้าสำเร็จ",centralwork:addwork})
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
        if(customers.companyname !=req.body.companyname)
        {
            const companyname = await Customer.findOne({companyname:req.body.companyname})
            if(companyname)
            {
                return res.status(200).send({status:false,message:`ชื่อบริษัท ${req.body.companyname}ซ้ำกัน ไม่สามารถเพิ่มได้ `})
            }
        }
        if(customers.taxid !=req.body.taxid){
            const taxid = await Customer.findOne({taxid:req.body.taxid})
            if(taxid)
            {
                return res.status(200).send({status:false,message:`ชื่อบริษัท ${req.body.taxid}ซ้ำกัน ไม่สามารถเพิ่มได้ `})
            }
        }
        if(customers.businessregistration !=req.body.businessregistration){
            const businessregistration = await Customer.findOne({businessregistration:req.body.businessregistration})
            if(businessregistration)
            {
                return res.status(200).send({status:false,message:`ชื่อบริษัท ${req.body.taxid}ซ้ำกัน ไม่สามารถเพิ่มได้ `})
            }
        }
        
        const customerdata ={
            customername: req.body.customername,
            companyfirst: req.body.companyfirst,
            companyname: req.body.companyname,
            customeemail: req.body.customeemail,
            //ที่อยู่ในการออกใบกำกับภาษี
            addresstax: req.body.addresstax,
            provincetax: req.body.provincetax,
            amphuretax: req.body.amphuretax,
            tambontax:req.body.tambontax,
            zipcodetax:req.body.zipcodetax,
            telephonetax :req.body.telephonetax,
            faxtax: req.body.faxtax,
            //ที่อยู่ในการส่งเอกสาร  
            address: req.body.address, //(ที่อยู่ใบกำกับภาษี) เพิ่มมา/
            province: req.body.province, //(จังหวัดใบกำกับภาษี)เพิ่มมา/
            amphure: req.body.amphure,//(อำเภอใบกำกับภาษี)เพิ่มมา/
            tambon: req.body.tambon,//(ตำบลใบกำกับภาษี)เพิ่มมา/
            zipcode : req.body.zipcode, //(ไปรษณีย์) เพิ่มมา/
            telephone :req.body.telephone,//(เบอร์โทรศัพท์)
            fax: req.body.fax, //(โทรสาร)เพิ่มมา/
            phonepersonal:req.body.phonepersonal,


            taxid: req.body.taxid,
            businessregistration: req.body.businessregistration,
            natureofbusiness : req.body.natureofbusiness,
            dateofincorporation :req.body.dateofincorporation,
            capital :req.body.capital,
            //ข้อมูลด้านธนาคารเพิ่มมา/
	        nameofbank :req.body.nameofbank,//ชื่อธนาคาร
	        accountno:req.body.accountno,//(เลขที่บัญชี)
	        branch : req.body.branch, //(สาขา)
	        contactperson: req.body.contactperson,
	        tel: req.body.tel,
	        facilities: req.body.facilities,
	        credit: req.body.credit,
	        //เงื่อนไขการวางบิลและรับเช็คเพิ่มมา/
	        billdate: req.body.billdate, //กำหนดวันรับวางบิล:
	        namebill: req.body.namebill, // ชื่อ-สกุลบุคคลที่รับวางบิล
	        countcredits: req.body.countcredits, //การนับเครดิต
	        othercountcredits: req.body.othercountcredits, //การนับเครดิตอื่น
	        paymentstype: req.body.paymentstype, //กำหนดการรับชำระเงิน:
	        setdatebillandcredits:req.body.setdatebillandcredits,   //กำหนดการรับเช็ค/โอนเงิน ทุกวันที่ :
	        contactbill: req.body.contactbill, //บุคคลที่ติดต่อเรื่องการรับชำระเงิน  
	        tellbill: req.body.tellbill,//โทร 
	        //ส่วนของบริษัท พิจารณาการขอเครดิต
	        approvalcredit: req.body.approvalcredit, //การอนุมัติการขอเครดิต 
            limitcredit: req.body.limitcredit, //วงเงินเครดิตที่ได้รับอนุมัติ บาท
	        datecredit: req.body.datecredit,//จำนวนวัน
	        employeename: req.body.employeename, //พนักงานขาย
	        notecredit: req.body.notecredit,//เหตุผลการพิจารณา 
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
        const deletecentralwork =  await Centralwork.deleteMany({customer_id:id})
        //ลบข้อมูลการดีลของทีมปิดรอรอบเก็บงาน
        return res.status(200).send({status:true,data:deletes,centralwork:deletecentralwork})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

module.exports.addadmin = async (req, res) => {
    try{
        const team1 = Team1.findById(req.body.team1_id)
        if(!team1){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลteam1"})
        }
        const companyname = await Customer.findOne({companyname:req.body.companyname})
       
        if(companyname)
        {
            return res.status(200).send({status:false,message:`ชื่อบริษัท ${req.body.companyname}ซ้ำกัน ไม่สามารถเพิ่มได้ `})
        }

        const taxid = await Customer.findOne({taxid:req.body.taxid})
        if(taxid)
        {
            return res.status(200).send({status:false,message:`ชื่อบริษัท ${req.body.taxid}ซ้ำกัน ไม่สามารถเพิ่มได้ `})
        }
        const businessregistration = await Customer.findOne({businessregistration:req.body.businessregistration})
        if(businessregistration)
        {
            return res.status(200).send({status:false,message:`ชื่อบริษัท ${req.body.taxid}ซ้ำกัน ไม่สามารถเพิ่มได้ `})
        }
        const customerdata = new Customer({
            customername: req.body.customername,
            companyfirst: req.body.companyfirst,
            companyname: req.body.companyname,
            customeemail: req.body.customeemail,
            //ที่อยู่ในการออกใบกำกับภาษี
            addresstax: req.body.addresstax,
            provincetax: req.body.provincetax,
            amphuretax: req.body.amphuretax,
            tambontax:req.body.tambontax,
            zipcodetax:req.body.zipcodetax,
            telephonetax :req.body.telephonetax,
            faxtax: req.body.faxtax,
            //ที่อยู่ในการส่งเอกสาร  
            address: req.body.address, //(ที่อยู่ใบกำกับภาษี) เพิ่มมา/
            province: req.body.province, //(จังหวัดใบกำกับภาษี)เพิ่มมา/
            amphure: req.body.amphure,//(อำเภอใบกำกับภาษี)เพิ่มมา/
            tambon: req.body.tambon,//(ตำบลใบกำกับภาษี)เพิ่มมา/
            zipcode : req.body.zipcode, //(ไปรษณีย์) เพิ่มมา/
            telephone :req.body.telephone,//(เบอร์โทรศัพท์)
            fax: req.body.fax, //(โทรสาร)เพิ่มมา/
            phonepersonal:req.body.phonepersonal,


            taxid: req.body.taxid,
            businessregistration: req.body.businessregistration,
            natureofbusiness : req.body.natureofbusiness,
            dateofincorporation :req.body.dateofincorporation,
            capital :req.body.capital,
            //ข้อมูลด้านธนาคารเพิ่มมา/
	        nameofbank :req.body.nameofbank,//ชื่อธนาคาร
	        accountno:req.body.accountno,//(เลขที่บัญชี)
	        branch : req.body.branch, //(สาขา)
	        contactperson: req.body.contactperson,
	        tel: req.body.tel,
	        facilities: req.body.facilities,
	        credit: req.body.credit,
	        //เงื่อนไขการวางบิลและรับเช็คเพิ่มมา/
	        billdate: req.body.billdate, //กำหนดวันรับวางบิล:
	        namebill: req.body.namebill, // ชื่อ-สกุลบุคคลที่รับวางบิล
	        countcredits: req.body.countcredits, //การนับเครดิต
	        othercountcredits: req.body.othercountcredits, //การนับเครดิตอื่น
	        paymentstype: req.body.paymentstype, //กำหนดการรับชำระเงิน:
	        setdatebillandcredits:req.body.setdatebillandcredits,   //กำหนดการรับเช็ค/โอนเงิน ทุกวันที่ :
	        contactbill: req.body.contactbill, //บุคคลที่ติดต่อเรื่องการรับชำระเงิน  
	        tellbill: req.body.tellbill,//โทร 
	        //ส่วนของบริษัท พิจารณาการขอเครดิต
	        approvalcredit: req.body.approvalcredit, //การอนุมัติการขอเครดิต 
            limitcredit: req.body.limitcredit, //วงเงินเครดิตที่ได้รับอนุมัติ บาท
	        datecredit: req.body.datecredit,//จำนวนวัน
	        employeename: req.body.employeename, //พนักงานขาย
	        notecredit: req.body.notecredit,//เหตุผลการพิจารณา

        }) 

        const add = await customerdata.save();
        const datawork = new Centralwork({
            customer_id: add._id,
        })
        const addwork = await datawork.save();
        return res.status(200).send({status:true,data:add,centralwork:addwork,message:"เพิ่มข้อมูลลูกค้าสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
    
}