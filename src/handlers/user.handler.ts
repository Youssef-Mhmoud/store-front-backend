import { Application, Request, Response } from 'express';
import { Users } from '../models/user.model';
import { User } from '../types/userType';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const users = new Users();

// Crud Operations
const Index = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token as string, config.tokenSecret as string);
  } catch (error) {
    res.status(401);
    res.json('Invalid Token');
    return;
  }
  try {
    const user = await users.index();
    res.json(user);
  } catch (error) {
    res.status(401);
    res.json('Cannot Get Users');
  }
};
const Show = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token as string, config.tokenSecret as string);
  } catch (error) {
    res.status(401);
    res.json('Invalid Token');
    return;
  }
  try {
    const user = await users.show(req.params.id as unknown as number);
    res.json(user);
  } catch (error) {
    res.status(401);
    res.json('Cannot Get User ');
  }
};
const Create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token as string, config.tokenSecret as string);
  } catch (error) {
    res.status(401);
    res.json('Invalid Token');
    return;
  }
  const userData: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  try {
    const user = await users.create(userData);
    const token = jwt.sign({ user: user }, config.tokenSecret as string);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json((error as string) + userData);
  }
};
const Update = async (req: Request, res: Response) => {
  try {
    const userData: User = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };
    const user = await users.update(userData);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const Delete = async (req: Request, res: Response) => {
  const user = await users.delete(req.body.id);
  res.json(user);
};
const Authenticate = async (req: Request, res: Response) => {
  const userAuthenticate: User = {
    id: req.body.id,
    password: req.body.password,
  };
  try {
    const user = await users.authenticate(
      userAuthenticate.id,
      userAuthenticate.password as string
    );
    const token = jwt.sign({ user: user }, config.tokenSecret as string);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json(error);
  }
};

const userRoutes = (app: Application) => {
  app.get('/users', Index);
  app.post('/users', Create);
  app.post('/users/authenticate', Authenticate);
  app.get('/users/:id', Show);
  app.put('/users/:id', Update);
  app.delete('/users/:id', Delete);
};

export default userRoutes;
