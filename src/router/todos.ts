import { createToDoDB, getAlltoDos } from '../controllers/todos'
import express from 'express'
import { isAuthenticated, isOwner } from '../middlewares'

export default (router: express.Router) => {
    router.get('/api/todos', isAuthenticated, getAlltoDos)
    router.post('/api/todo', isAuthenticated, createToDoDB)
}