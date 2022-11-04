import  config  from '../config/config';
import { Application, Request, Response } from 'express';
import { Order } from '../models/order.model';
import { Orders } from '../types/ordersType';
import jwt from 'jsonwebtoken'

const order = new Order();

// Crud Operations
const Index = async (_req: Request, res: Response) => {
  const orders = await order.index();
  res.json(orders);
};
const Show = async (req: Request, res: Response) => {
  const orders = await order.show(req.body.id);
  res.json(orders);
};
const Create = async (req: Request, res: Response) => {
  try {
    const orderData: Orders = {
      id: req.body.id,
      status: req.body.status,
      user_id: req.body.user_id,
    };
    const orders = await order.create(orderData);
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const createProduct = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token as string, config.tokenSecret as string);
  } catch (error) {
    res.status(401);
    res.json('Invalid Token');
    return;
  }
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  const quantity: number = req.body.quantity;
  try {
    const orders = await order.createProduct(quantity, orderId, productId);
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const Update = async (req: Request, res: Response) => {
  try {
    const orderData: Orders = {
      id: req.body.id,
      status: req.body.status,
      user_id: req.body.user_id,
    };
    const orders = await order.update(orderData);
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const Delete = async (req: Request, res: Response) => {
  const orders = await order.delete(req.body.id);
  res.json(orders);
};

const ordersRoutes = (app: Application) => {
  app.get('/orders', Index);
  app.post('/orders', Create);
  app.post('/orders/:id/products', createProduct);
  app.get('/orders/:id', Show);
  app.put('/orders/:id', Update);
  app.delete('/orders/:id', Delete);
};

export default ordersRoutes;
