import { createUser, getUserByEmail, UserModel } from '../db/users';
import express from 'express';
import { authentication, random } from '../helpers';

export const login: any = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }

        const user = await getUserByEmail(email).select('+auth.salt +auth.password')

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const expectedHash = authentication(user.auth.salt, password)

        if (user.auth.password != expectedHash) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const salt = random()
        user.auth.sessionToken = authentication(salt, user._id.toString())

        await user.save();

        res.cookie('AUTH', user.auth.sessionToken, { domain: 'localhost', path: '/' })
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })

    }

}

export const register: any = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body

        if (!email || !password || !username) {
            return res.status(400).json({ message: "Bitte alle Felder angeben" })
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const salt = random()
        const user = await createUser({
            email,
            username,
            auth: {
                salt,
                password: authentication(salt, password)
            }
        })
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error })
    }
}

