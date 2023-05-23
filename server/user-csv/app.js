const express= require('express')
const UserMaster= require('./models/master')
const cors = require('cors');
const csv= require('fast-csv')
const fs= require('fs')
const app=express()
const port=4001

require("dotenv").config()
require('./connection')

app.use(cors())
app.use('/files',express.static('./public/files'))

app.get('/user',async (req,res)=>{
    try {
        const usersdata = await UserMaster.find();

        const csvStream = csv.format({ headers: true });

        if (!fs.existsSync("public/files/export/")) {
            if (!fs.existsSync("public/files")) {
                fs.mkdirSync("public/files/");
            }
            if (!fs.existsSync("public/files/export")) {
                fs.mkdirSync("./public/files/export/");
            }
        }

        const writablestream = fs.createWriteStream(
            "public/files/export/users.csv"
        );

        csvStream.pipe(writablestream);

        writablestream.on("finish", function () {
            res.json({
                downloadUrl: `http://localhost:4001/files/export/users.csv`,
            });
        });
        if (usersdata.length > 0) {
            usersdata.map((UserMaster) => {
                csvStream.write({
                    Name: UserMaster.name ? UserMaster.fname : "-",
                    Email: UserMaster.email ? UserMaster.email : "-",
                    Gender: UserMaster.gender ? UserMaster.gender : "-",
                    Status: UserMaster.status ? UserMaster.status : "-",
                    DateCreated: UserMaster.Created_at ? UserMaster.Created_at : "-",
                    DateUpdated: UserMaster.Updated_at ? UserMaster.Updated_at : "-",
                })
            })
        }
        csvStream.end();
        writablestream.end();

    } catch (error) {
        res.status(401).json(error)
    }
})

app.listen(port,()=>{
    console.log(`store server is running on port ${port}`);
})