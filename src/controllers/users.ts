import express from 'express'

import { deleteUserById, getUserById, getUsers } from '../db/users'

export const getAllUsers: any = async (req: express.Request, res: express.Response) => {

    try {
        const users = await getUsers();
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error fetching users' });
    }

}

export const deleteUser: any = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deleteUser = await deleteUserById(id);

        return res.json(deleteUser)
    } catch (error) {
        console.log(error)
        return res.status(400)
    }
}

export const updateUser: any = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ message: "No username was entered" })
        }

        const user = await getUserById(id)

        if (!user) {
            return res.status(404).json({ message: "Usernot found" })
        }

        user.username = username;
        await user.save()
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "An error occurred" });
    }
}