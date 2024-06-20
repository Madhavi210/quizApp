// src/server.ts
import 'reflect-metadata';
import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB  from './config/database';
import { InversifyExpressServer } from "inversify-express-utils";
import {container} from './config/inversify.config';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
const port = process.env.PORT || 8800;

const server = new InversifyExpressServer(container, null, { rootPath: '/api' });

server.setConfig((app) => {
    // Set up CORS middleware
    app.use(cors({
        origin: 'http://localhost:4200', // Replace with your Angular app's URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        optionsSuccessStatus: 200
    }));

    app.use(express.json())
    app.use(express.urlencoded({extended: true}));

    app.use(session({
        secret: 'key', // Replace with your actual secret key
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 1 day (in milliseconds)
            httpOnly:true
        }
    }));
});

connectDB()
.then(() =>{
    const appServer = server.build();
    appServer.listen(port, () => {
        console.log(`Site:- http://localhost: ${port}`);
      });
})
.catch((error:any) =>{
    console.log(`failed to connect with db ${error}`);
    process.exit();
})


