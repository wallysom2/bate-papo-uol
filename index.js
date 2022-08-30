
import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import joi from 'joi'
import {MongoClient} from "mongodb";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(json());


app.listen(5000, () => console.log(
    chalk.blue.bold(
        "Server is running on port 5000"
)))