import  { Application, Request, Response } from 'express';
import { Users } from '../models/user.model';
import { User } from '../types/userType';

const users = new Users();

// Crud Operations
const Index = async (_req: Request, res: Response) => {
  const user = await users.index()
  res.json(user)
}
const Show = async (req: Request, res: Response) => {
  const user = await users.show(req.body.id)
  res.json(user)
}
const Create = async (req: Request, res: Response) => {
  try {
    const userData: User = {
      id: req.body.id,
      user_name: req.body.user_name,
      password: req.body.password
    } 
    const user = await users.create(userData)
    res.json(user)
    
  } catch (error) {
    res.status(400)
    res.json(error)
}
}
const Update = async (req: Request, res: Response) => {
  try {
    const userData: User = {
      id: req.body.id,
      user_name: req.body.user_name,
      password: req.body.password
    } 
    const user = await users.update(userData)
    res.json(user)
    
  } catch (error) {
    res.status(400)
    res.json(error)
}
}
const Delete = async (req: Request, res: Response) => {
  const user = await users.delete(req.body.id)
  res.json(user)
}


const userRoutes = (app: Application) => {
  app.get('/users', Index)
  app.post('/users', Create)
  app.get('/users/:id', Show)
  app.put('/users/:id', Update)
  app.delete('/users/:id', Delete)
}

export default userRoutes