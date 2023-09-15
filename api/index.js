const express = require('express');
const cors = require('cors');

const mongoose = require("mongoose");
const User= require('./models/user');
const bcrpyt= require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser= require('cookie-Parser');
const app=express();

const salt = bcrpyt.genSaltSync(10);
const secret = 'wirgjw3itjq3[ojq3wq3rg'
app.use(cors({credentials:true, origin:"http://localhost:3001"}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://blog:utLTANHuBY4YkRIh@cluster0.rsaydnk.mongodb.net/?retryWrites=true&w=majority')
app.post('/register', async (req,res)=>{
    const {username,password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password: bcrpyt.hashSync(password,salt),
        })
        res.json(userDoc);
    }
    catch(e){
        res.status(400).json(e);
    }
    
});

app.post('/login', async (req,res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne ({username});
    const passOk = bcrpyt.compareSync (password, userDoc.password)
    if (passOk) {
        jwt.sign({username ,id:userDoc._id}, secret ,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token);
            res.json('ok');
        });
            
    } else {
        res.status (400).json('wrong credentials');
    }
    });

app.get('/profile',(req,res)=>{
    const{token}=req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if(err) throw err;
        res.json(info);
    });
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
})
app.listen(3000);