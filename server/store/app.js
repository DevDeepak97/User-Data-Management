const express= require('express')
const request = require('request');
const UserMaster= require('./models/master')
const cors = require('cors');
const app=express()
const port=4000

require("dotenv").config()
require('./connection')

app.use(cors())

app.post('/api/users',async (req,res)=>{
    let data;
    const url="https://gorest.co.in/public-api/users"
    request({url:url,json:true},async (error,response)=>{
    if(error){
        console.log(`unable to get data`);
        res.status(404).json({status:'Unable to fetch data from API'})
    }else{   
        const {data}=response.body
        try{ 
            await UserMaster.deleteMany()
            await UserMaster.create(data)
            console.log(`data uploaded`);
            res.status(200).send(data)
        }catch(err){
            console.log(`failed`);
            res.status(404).json({status:'Failed to insert data to database'})
        }
    }  
   })
})

app.listen(port,()=>{
    console.log(`store server is running on port ${port}`);
})