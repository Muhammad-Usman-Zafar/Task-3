const express = require("express");
const path = require("path")

const app = express();

app.use(express.static('./Public'))


app.get("/home", (req, res)=>{
    res.sendFile(path.resolve(__dirname,'./navbar-app/index.html'))
})

app.all("*", (req, res)=>{
    res.status(404);
    res.send("Page Not Found :(")
})

app.listen(5000, ()=>{
    console.log("Yes Listening PORT 5000 ");
})