import { Application, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { Products } from '../types/productsType';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const product = new Product();

// Crud Operations
const Index = async (_req: Request, res: Response) => {
  const products = await product.index();
  res.json(products);
};
const Show = async (req: Request, res: Response) => {
  const products = await product.show(req.params.id as unknown as number);
  res.json(products);
};
const Create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token as string, config.tokenSecret as string);
  } catch (error) {
    res.status(401);
    res.json('Invalid Token');
    return
  }
  try {
    const productData: Products = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    };
    const products = await product.create(productData);
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const Update = async (req: Request, res: Response) => {
  try {
    const productData: Products = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    };
    const products = await product.update(productData);
    res.json(products);
  } catch (error) {
    res.status(400);
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
    return
  }
  try {
      const products = await product.delete(req.body.id);
  res.json(products);
  } catch (error) {
    res.status(400)
    res.json(error)
  }

};

const productsRoutes = (app: Application) => {
  app.get('/products', Index);
  app.post('/products', Create);
  app.get('/products/:id', Show);
  app.put('/products/:id', Update);
  app.delete('/products/:id', Delete);
};

export default productsRoutes;
