import { get, identity } from 'lodash';
import { createToDo, deleteToDoById, getToDoById, getToDos } from '../db/todos'
import express from 'express'

export const createToDoDB: any = async (req: express.Request, res: express.Response) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const currentUserId = get(req, 'identity._id') as string;
        const todo = await createToDo({
            title,
            description,
            createdBy: currentUserId
        })

        res.status(200).json(todo)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating toDo" })
    }
}

export const getAlltoDos = async (req: express.Request, res: express.Response) => {
    try {
        const currentUserId = get(req, 'identity._id') as string;
        const toDos = await getToDos(currentUserId)
        res.status(200).json(toDos)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error fetching ToDo's" })
    }
}

export const deleteToDo = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const deletedToDo = await deleteToDoById(id)
        return res.status(200).json(deleteToDo)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error deleting ToDo" })
    }
}

export const updateToDo = async (req: express.Request, res: express.Response) => {
    try {
        const { id, title, description } = req.params
        const toDo = await getToDoById(id)

        if (!toDo) {
            return res.status(404).json({ message: "ToDo not found" })
        }

        toDo.title = title;
        toDo.description = description;

        await toDo.save()
        return res.status(200).json(toDo)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error updating ToDo" })
    }

}