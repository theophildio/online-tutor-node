const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());
// middleware ends

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mhyxo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try{
    await client.connect();
    const courceCollection = client.db('onlineTutor').collection('cource');
    
    app.get('/cource', async (req, res) => {
      const query = {};
      const cursor = courceCollection.find(query);
      const cources = await cursor.toArray();
      res.send(cources);
    });

    app.get('/cource/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const cource = await courceCollection.findOne(query);
      res.send(cource);
    });

    // Post ada
    app.post('/cource', async (req, res) => {
      const newService = req.body;
      const resutl = await courceCollection.insertOne(newService);
      res.send(resutl);
    })

  }

  finally {

  }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Online Tutor Node Server is started.');
})

app.listen(port, () => {
  console.log('Listening to port:', port);
})