const exp=require("express");
const productApiObj=exp.Router();
const errHandler=require("express-async-handler");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
productApiObj.use(exp.json())

//cloudinary imports
const cloudinary=require("cloudinary").v2;
const { CloudinaryStorage }=require("multer-storage-cloudinary")
const multer=require("multer")

//configure cloudinary
cloudinary.config({
    cloud_name: 'dvcbw48b0',
    api_key:'866446437434251',
    api_secret:'ohZmbwRe6ROkeheMESYb06AUGCc',
});

//configure cloudinary storage
const storage =new CloudinaryStorage({
    cloudinary: cloudinary,
    params:async(req,file)=>{
        return{
        folder:'sushmitha',
        public_id:file.fieldname+'-'+Date.now(),
        format: async(req, file)=> ['png','jpg'],
      /* filename: function (req,file,cb)
        {
            cb(undefined, file.filename + '-' + Date.now());
        }*/
    }
    },
});

//configure multer
var upload=multer({storage: storage});

productApiObj.post("/addproduct",upload.single("image"),errHandler( async(req,res,next)=>{
    console.log("url is",req.file.path);
    console.log("product data is", JSON.parse(req.body.userObj))
    let productCollectionObj=req.app.get("productCollectionObj")
    let userObj=req.body;

    req.body=JSON.parse(req.body.userObj)
req.body.image=req.file.path;
    //check for product in db
    let user=await productCollectionObj.findOne({productname:userObj.productname})
    //if product is existed
    if(user!==null){
           res.send({message:"product existed"})
    }
    else{
              userObj.userImgLink=req.file.path;
            //add product
            let success=await productCollectionObj.insertOne(req.body)
            res.send({message:"product added"})
    }
}))

productApiObj.get("/abc",errHandler ( async(req,res,next)=>{
    const productCollectionObj=req.app.get("productCollectionObj")
    let success=await productCollectionObj.find().toArray()
    res.send({message:success})
}))

productApiObj.get("/oneproduct/:productname",errHandler( async(req,res,next)=>{
    const productCollectionObj=req.app.get("productCollectionObj")
    let success=await productCollectionObj.find({productname:req.params.productname}).toArray()
    res.send({message:success})
}))

productApiObj.put("/updateproduct", errHandler ( async(req,res,next)=>{
    let productCollectionObj=req.app.get("productCollectionObj")
    let userObj=req.body;
    console.log(userObj) 
    let user=await productCollectionObj.findOne({productname:userObj.productname})
    console.log(user)
    //if product is existed
    if(user!==null){
      let success =await productCollectionObj.updateOne({productname:userObj.productname},{$set:{brand:userObj.brand,category:userObj.category,price:userObj.price}})
            res.send({message:"product updated"})
    }
    else{
        res.send({message:"product not found"})
    }      

}))

productApiObj.post("/removeproduct", errHandler( async(req,res,next)=>{
    let productCollectionObj=req.app.get("productCollectionObj");
    let userObj=req.body;
    console.log(userObj)
    let user=await productCollectionObj.findOne({productname:userObj.productname})
    console.log(user)
    //if product is existed
    if(user!==null){
    //add product
            let success=await productCollectionObj.deleteOne({productname:userObj.productname})
            res.send({message:"product removed"})
    }
  else{
      res.send({message:"product not found"})
  }
}))

module.exports=productApiObj
