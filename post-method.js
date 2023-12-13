const express = require("express");
const app = express();
const {people} = require("./data")

app.use(express.static('./methods-public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/api/people', (req, res)=>{
    res.status(200).send({success: true, data: people})
})

app.post("/api/people",(req, res)=>{
    const {name} = req.body;
    if (!name){
        return res.status(400).send({success: false, msg: 'Please Provide name value'})
    }
    res.status(200).send({success: true, person: name, data: [...people, name]})
})


app.put("/api/people/:id",(req, res)=>{
    const {id} = req.params
    const {name} = req.body;
    const person = people.find((person)=> person.id === Number(id) )
   
    if (!person){
        res.status(404).json({success: false, msg: 'No person against the id', data: people})
    }
    const newPerson = people.map((person)=>{
            if(person.id === Number(id)){
                person.name = name;
            }
            return person;
        
    })
    res.status(200).send({success: true, data: newPerson})
})

app.delete("/api/people/:id", (req, res)=> {

    const {id}= req.params; 

    const perosn = people.find((per)=> per.id === Number(id))

    if (!perosn) {
        res.status(404).json({success:false, msg: 'person is not in the list'})
    }
    const newPerson = people.filter((per)=> per.id !== Number(id))
    

    return res.status(200).json({success: true, msg:'deleted', data: newPerson})

})

app.post("/login", (req, res)=>{
    const {name} = req.body;
    if (name){
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(404).send("No name Found!")
})

app.listen(5000, ()=>{
    console.log("listening on Port 5000");
})