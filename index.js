const exprss = require('express');
const https = require('https');
const port = 8000 || process.env.PORT;
const app = exprss();
const { google } = require('googleapis');
const readline = require('readline');

app.use(exprss.json());
app.use(exprss.urlencoded({extended:true}));

const DB = require('./config/mongoose');
const { request } = require('http');

app.get('/',(req,res)=>{
    res.send("Yeah ! Server is Run");
})

const route = require('./routes/route');
app.use('/api',route)

app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Server in run on port :: ", port);
})

