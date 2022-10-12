const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const mongoose = require("mongoose")
const User = require('./models/user.models')
const app = express();
const bcrypt = require("bcryptjs")
const productdb = require('./models/product.models');
const categorydb = require('./models/category.models');
const subcategorydb = require('./models/sub_category.models');
const branddb = require('./models/brand.models');
app.use(cors());
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/clore')

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
            product_name : req.body.product_name,
            category_id : req.body.category_id,
            sub_category_id : req.body.sub_category_id,
            brand_id : req.body.brand_id,
            price : req.body.price,
            small_desc : req.body.small_desc,
            long_desc : req.body.long_desc,
            image1 : req.body.image1,
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

app.listen(1337, ()=>{
	console.log("Server is Started...")
})