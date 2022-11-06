import express, { Application, Request, Response } from 'express';
import config from './config/config';
import cors from 'cors';
import userRoutes from './handlers/user.handler';
import productsRoutes from './handlers/products.handler';
import ordersRoutes from './handlers/orders.handler';

const app: Application = express();
const PORT = config.port || 3000;

const corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', (req: Request, res: Response) => {
  res.json({
    message: 'Hello world',
  });
});
userRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.listen(3000, () => {
  console.log(`starting app on: ${PORT}`);
});

export default app