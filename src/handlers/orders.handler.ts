import  config  from '../config/config';
import { Application, Request, Response } from 'express';
import { Order } from '../models/order.model';
import { Orders } from '../types/ordersType';
import jwt from 'jsonwebtoken'
import { Orders_Products } from '../types/order_produts';

const order = new Order();

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
  const orders = await order.index();
  res.json(orders);
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
  const orders = await order.show(req.params.id as unknown as number);
  res.json(orders);
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
  try {
    const orderData: Orders = {
      id: req.body.id,
      status: req.body.status,
      user_id: req.body.user_id,
    };
    const orders = await order.create(orderData);
    res.json(orders);
  } catch (error) {
    res.status(500);
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
  const orderData: Orders_Products = {
    quantity: parseInt(req.body.quantity),
    products_id: req.body.productId,
    order_id: req.params.id,
  };
  try {
    const orders = await order.createProduct(orderData);
    res.json(orders);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};
const Update = async (req: Request, res: Response) => {
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
    const orderData: Orders = {
      id: req.body.id,
      status: req.body.status,
      user_id: req.body.user_id,
    };
    const orders = await order.update(orderData);
    res.json(orders);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};
const Delete = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token as string, config.tokenSecret as string);
  } catch (error) {
    res.status(401);
    res.json('Invalid Token');
    return;
  }
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
