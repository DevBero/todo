import { Request, Response } from "express"
import client from "../config/db"
import bcrypt from 'bcrypt'

const emailExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const register: any = async (req: Request, res: Response) => {
    const { firstname, lastname, email, password } = req.body

    if (!firstname || !lastname || !email || !password) {
        res.status(400).json({ message: "All fields are required" })
    }

    if (!emailExp.test(email)) {
        return res.status(400).json({ message: "Invalid mail adress" })
    }

    const emailExists = await client.query('SELECT * FROM users where email = $1', [email])

    if (emailExists.rowCount! > 0) {
        return res.status(400).json({ message: "Email already in use" })
    }

    try {
        const query = `INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4)`
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const values = [firstname, lastname, email, hashedPassword]
        await client.query(query, values)
        res.status(200).json({ message: "User created succesfully!" })
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Failed to register user" });
    }

}

export const login: any = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ message: "All fields are required" })
    }

    if (!emailExp.test(email)) {
        return res.status(400).json({ message: "Invalid mail adress" })
    }

    try {
        const query = 'SELECT email, password FROM users WHERE email = $1';
        const { rows } = await client.query(query, [email])

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const user = rows[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        res.status(200).json({ user })
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Failed to register user" });
    }

}