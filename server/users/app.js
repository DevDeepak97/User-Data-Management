const express= require('express')
const cors = require('cors');
const app=express()
const UserMaster= require('./models/master')
const port=4002

require("dotenv").config()
require('./connection')

app.use(express.json());
app.use(cors())

app.get('/api/users',async (req,res)=>{
    const data = await UserMaster.find({})
    if (data) {
        res.status(200).send(data)
    }
    else {
        res.status(404).send('Data not found')
    }
})

app.put('/api/users/:_id',async (req,res)=>{
    const { name,email,gender,status } = req.body

    if (name || email || gender || status) {
        await UserMaster.updateOne(req.params,{$set: req.body})
        const dbData = await UserMaster.findOne(req.params) 
        console.log(`bye:${dbData}`);
        res.status(200).send(dbData)        
    }
    else {
        res.status(400).send()
    }
})

app.listen(port,()=>{
    console.log(`store server is running on port ${port}`);
})