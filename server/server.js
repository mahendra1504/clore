const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const mongoose = require("mongoose")
const User = require('./models/user.models')
const app = express();
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

app.listen(1337, ()=>{
	console.log("Server is Started...")
})