const express = require("express");

const { products, people} = require("./data")


const app = express();


app.get("/", (req, res)=>{
    res.send('<h1>Home Page</h1> <a href="/api/products">Product</a>')
})

app.get("/api/products", (req, res)=>{
    const newProduct = products.map((prod) => {
        const {id, name, image} = prod;
        return {id, name, image}
    })
    res.json(newProduct)
})

app.get("/api/products/:id", (req, res) => {
    const singleProduct = products.find((prod) => prod.id === parseInt(req.params.id));
    if (!singleProduct) {
        res.status(404).json({ error: "Product not found" });
        return;
    }
    res.json(singleProduct);
});

app.get("/api/v1/query", (req,res)=>{
    const {search, limit} = req.query
    let sortedProd = [...products];
    if(search){
        sortedProd = sortedProd.filter((pro)=> {
            return pro.name.startsWith(search)
        })
    }

    if(limit){
        sortedProd = sortedProd.slice(0, Number(limit))

    }
    if (sortedProd.length < 1) {
        return res.status(200).send("No product to display.")
    }

    res.status(200).json(sortedProd);
})


app.listen(5000, ()=>{
    console.log("Server is listening on Port 5000");
})