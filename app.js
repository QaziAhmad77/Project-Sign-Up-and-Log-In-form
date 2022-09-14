const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const homeRouter = require("./routers/homeRouter");

const port = process.env.PORT || 4000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));  
app.use('/',homeRouter);

mongoose.connect("mongodb+srv://QaziAhmad:qazi03331602121ahmad@cluster0.82zpao1.mongodb.net/loginproject").then(function(){
    console.log("Database connected successfully");
}).catch(function(err){
    console.log(err);
    console.log("There is some issue while connecting database");
});


app.listen(port, ()=>{
    console.log(`Server is running on port : ${port}`);
})