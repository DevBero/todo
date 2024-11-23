import { getUserBySessionToken } from '../db/users';
import express from 'express';
import { get, merge } from 'lodash'

export const isOwner: any = async (req: any, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId) {
            return res.status(403)
        }

        if (currentUserId.toString() !== id) {
            return res.status(403).json({ message: "Unauthorized Bro" })
        }

        next()
    } catch (error) {
        console.log(error);
        res.send(400)
    }
}

export const isAuthenticated: any = async (req: any, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['AUTH'];

        if (!sessionToken) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const existingUser = await getUserBySessionToken(sessionToken)

        if (!existingUser) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        merge(req, { identity: existingUser })

        return next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }

}