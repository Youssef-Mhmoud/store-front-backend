import express, { Application, Request, Response } from 'express';
import config from './config';
import routes from './routes';
import morgan from 'morgan';


const app: Application = express();
const PORT = config.port || 3000;

app.use(morgan('common'));

app.use(express.json());

app.use('/api', routes);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World!!',
  });
});

app.listen(PORT, () => {
  console.log(`Port Is Listen ${PORT}`);
});

export default app;
