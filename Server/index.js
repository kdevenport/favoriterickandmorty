var express = require("express")
var bodyParser=require("body-parser")
var cors = require("cors")
var app=express();
app.use(bodyParser.json())
app.use(cors())

//this will be our favorite list
let favorites=[]

//Endpoints

app.get("/api/favorites", (req, res)=> {
    res.send(favorites)
})
app.post("/api/favorites", (req, res)=>{
    if (favorites.includes(req.body)) {
        return res.status(400).send({ message: 'ID already added' });
    } else {
    favorites.push(req.body);
    res.send(favorites)
    }
})
app.patch('/api/favorites/:id', (req,res)=>{
    let {id} = req.params;
    let name = req.body.data;
    favorites[id].name = name;
    res.send(favorites);
});
app.delete("/api/favorites/:id", (req, res)=>{
    let {id} = req.params;
    favorites.splice(id, 1);
    res.status(200).send(favorites);
})


//Port server is listening on
app.listen(3001, ()=>console.log("listening on: ", 3001));