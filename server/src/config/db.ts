import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Client } = pg


const client = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT!),
    database: process.env.PGDB
})

export const connectDB = async () => {
    try {
        await client.connect()
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error Connecting to DB:", error)
    }
}

export default client


