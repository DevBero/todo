import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './config/db'
import router from './routes/userRoutes'
dotenv.config()

const port = process.env.PORT;
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use('/api/v1/', router)

connectDB()

app.listen(port, () => {
    console.log('Server running on port:', port)
})