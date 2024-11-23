import dotenv from 'dotenv';
import express from 'express'
import http from 'http'
import bodyParse from "body-parser"
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import router from './router';
import mongoose from 'mongoose';

dotenv.config()


const app = express();

app.use(cors({
    credentials: true
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParse.json());
app.use('/', router())

const server = http.createServer(app)

server.listen(8080, () => {
    console.log('Server is running on port 8080')
})

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.bq9yy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the application if the connection fails
    }
};

connectToDatabase();


console.log("Hello Node")