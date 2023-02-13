/* eslint-disable @typescript-eslint/no-unused-vars */
//typescript에서는 es6 module을 사용해야 type이 제대로 적용된다.
import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todo';

const app = express();
const port = 3000;

//body-parser
app.use(express.json());
app.use('/todos', todoRoutes);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('index');
  return res.status(200).json({ message: 'hello world!!' });
});

//Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  //에러발생시 처리 next(err)
  console.error(err);
  return res.status(500).json({ message: err.message });
});

//invalid path
app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ message: 'invalid Access' });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
