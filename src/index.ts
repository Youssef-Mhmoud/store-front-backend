import express, { Application, Request, Response } from 'express';
import config from './config';
import routes from './routes';

const app: Application = express();
const PORT = config.port || 3000;

app.use('/api', routes)

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World!!',
  });
});


app.listen(PORT, () => {
  console.log(`Port Is Listen ${PORT}`);
});

export default app;
