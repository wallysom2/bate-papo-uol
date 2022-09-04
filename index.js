
import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import joi from 'joi'
import {MongoClient} from "mongodb";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(json());
dotenv.config ();

let db;
const mongoClient = new MongoClient (process.env.MONGO_URI);

app.post ("/participants", async (req,res) => {
    const newUSer = req.body;
    const participantsSchema = joi.object ({
        name: joi.string().required()
    });

    const validacao = participantsSchema.validate(newUSer);
    if(validacao.error) {
      res.status(422).send(validacao.error.details);
      return;
    }

    try {
        await mongoClient.connect();
        db = mongoClient.db("uol-db");
    
        await db.collection("users").insertOne({...newUSer});
        res.sendStatus(201);
    
        mongoClient.close();
      } catch (e) {
        res.status(500).send("Ocorreu um erro ao criar novo usario!", e);
        mongoClient.close();
      }
})

app.get("/participants", async (req, res) => {

  try {
    await mongoClient.connect();
    db = mongoClient.db("uol-db");

    const usarios = await db.collection("users").find().toArray();
    res.send(usarios);

    mongoClient.close();
  } catch (e) {
    res.status(500).send("Ocorreu um erro ao obter os usuários!", e);
    mongoClient.close();
  }
});



app.listen(5000, () => console.log(
    chalk.blue.bold(
        "Server is running on port 5000"
)))