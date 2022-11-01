import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT = 3000;

app.use(express.json());

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${PORT}`);
});
