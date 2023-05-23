const mongoose = require("mongoose");

const DB = process.env.DATABASE || 'mongodb://localhost:27017/User'
console.log(DB); 

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log("DataBase Connected")).catch((err)=>{
    console.log(err);
}) 
