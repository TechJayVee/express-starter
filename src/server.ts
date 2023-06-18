import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Application, NextFunction, Request, Response } from 'express';

import globalErrorHandler from './controller/errorController';
import { AppDataSource } from './data-source';
import { private_api, public_api } from './routes';
import { CustomError } from './utils';

const server: Application = express();

const PORT = process.env.PORT || 8000;

server.use(cors());

// establish database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

// built-in middleware to handle urlencoded form data
server.use(express.urlencoded({ extended: false }));

// built-in middleware for json
server.use(express.json());

// middleware for cookie
server.use(cookieParser());

server.use('/public/v1', public_api);

server.use('/private/v1', private_api);
server.get('/', (req: Request, res: Response) =>
  res.send(`Welcome to Stater  API `)
);

server.all('/*', (req: Request, res: Response, next: NextFunction) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});

server.use(globalErrorHandler);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}...`);
  });
}

startServer();
