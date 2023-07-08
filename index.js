// npm init
// npm i express
// npm i body-parser 
// npm i mongodb
// npm i mongoose
const express = require('express');
const app = express();
// Import Body Parser
const bodyParser = require('body-parser');

// Le middleware pour  l'utiliser  le post
app.use(bodyParser.json());
// 2éème choix
// app.use(express.json());

let db;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const dbname = 'MyDB';

const client = new MongoClient(url);
client.connect().then(()=>{
    console.log('Mongodb is connected');
    db = client.db(dbname)
})

// Afficher tout l'equipe
app.get('/equipes',async(req,res)=>{
    const docs = await db.collection('equipes').find({}).toArray();
    res.json(docs)
})

// Afficher une seule equipe avec sa id
app.get('/equipes/:id',async(req,res)=>{
    const id = parseInt(req.params.id);
    const doc = await db.collection('equipes').find({"_id":id}).toArray();
    res.json(doc)
})

// Ajouter une equipe
app.post('/equipes',async(req,res)=>{
    const data = req.body;
    const result = await db.collection('equipes').insertOne(data);
    res.send(result);
    
})

// Modifier une equipe
app.put('/equipes/:id',async(req,res)=>{
    const id = parseInt(req.params.id);
    const newData = req.body;
    const result = await db.collection('equipes').replaceOne({"_id":id},newData);
    res.json(result);    
})

// Pour supprimer une equipe
app.delete('/equipes/:id',async(req,res)=>{
    const id = parseInt(req.params.id);
    const result = await db.collection('equipes').deleteOne({"_id":id});
    res.json(result);  

})



const port = 3000;
app.listen(port,()=>{
    console.log(`App listen on http://127.0.0.1:${port}`);
});