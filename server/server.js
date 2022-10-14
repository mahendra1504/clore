const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const mongoose = require("mongoose")
const User = require('./models/user.models')
const app = express();
const bcrypt = require("bcryptjs")
<<<<<<< Updated upstream
const productdb = require('./models/product.models');
const categorydb = require('./models/category.models');
const subcategorydb = require('./models/sub_category.models');
const branddb = require('./models/brand.models');
const multer = require('multer')
const fs = require('fs')
=======
>>>>>>> Stashed changes
app.use(cors());
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/clore')


var storage = multer.diskStorage({
    destination : function (req, file, callback) {
        var dir = "./productImages";
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },

    filename : function(req, file, callback){
        callback(null, file.originalname);
    }
});

var uploadImage = multer({storage : storage}).array('product_image',4);

app.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        await User.create({
            first_name : req.body.fname,
            last_name  : req.body.lname,
            phone : req.body.phone,
            email : req.body.email,
            password : req.body.password,
            created_at : new Date(),
            updated_at : new Date(),
            street : null,
            city : null,
            state : null,
            pincode : null,
        })
        return res.json({status : 'ok'})
    } 
    catch (err) {
        console.log(err)
        return res.json({status : 'error'})
    }
    return res.json({status : 'ok'});
})

app.post('/api/login', async (req, res) => {
    
    const user = await User.findOne({
        email : req.body.email, 
        password : req.body.password, 
    })
    
    if(user) {
        const token = jwt.sign({
            name : user.name,
            email : user.email,
        }, 'secret123') 

        return res.json({ status : 'ok', user : token})
    }else {
        return res.json({ status : 'error', user : false})
    }
    
    return res.json({status : 'ok'});
    
})

app.post('/api/addproduct', async (req, res) => {
    console.log(req.body);
    //const { product_name, category_id, sub_category_id, brand_id, price, small_desc, long_desc, image1, color, size, qty} = req.body
    try {
        const addProduct = await productdb.create({
            product_name : req.body.pname,
            category_id : req.body.category_id,
            sub_category_id : req.body.sub_category_id,
            brand_id : req.body.brand_id,
            price : req.body.price,
            small_desc : req.body.small_desc,
            long_desc : req.body.long_desc,
            //image1 : req.body.image1,
            //image2 : {type : String, required : true},
            //image3 : {type : String, required : true},
            //image4 : {type : String, required : true},
            color : req.body.color,
            qty : req.body.qty,
            size : req.body.size
        })
        console.log()
        res.status(201).json(addProduct)
    } 
    catch (err) {
        console.log(err)
        res.status(422).json("Error Found")
    }
})

app.get("/api/getproduct", async (req, res) => {
    try {
        const productdata = await productdb.find().populate('category_id sub_category_id brand_id');
        res.status(201).json(productdata)
        // console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.get("/api/getbrand", async (req, res) => {
    try {
        const branddata = await branddb.find();
        res.status(201).json(branddata)
        // console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.get("/api/getcategory", async (req, res) => {
    try {
        const categorydata = await categorydb.find();
        res.status(201).json(categorydata)
        // console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.get("/api/getsubcategory", async (req, res) => {
    try {
        const subcategorydata = await subcategorydb.find();
        res.status(201).json(subcategorydata)
        // console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.listen(1337, ()=>{
	console.log("Server is Started...")
})