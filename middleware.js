const express = require("express");
const app = express();

const logger = require("./logger")
//the will run before every Api
app.use(logger)

//Routes
app.get("/",(req, res)=>{
    res.send("Home")
})

app.get("/about",(req, res)=>{
    res.send("About")
})

app.get("/api/products",(req, res)=>{
    res.send("Products")
})

app.get("/api/items",(req, res)=>{
    res.send("Items")
})
app.listen(5000, ()=>{
    console.log("listening on Port 5000");
})