import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import homeRouter from './routers/homeRouter';
import morgan from 'morgan';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// *********************************************
// ************ Setting up routes **************
// *********************************************

app.use('/api', homeRouter);

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
    return res.sendStatus(StatusCodes.NOT_FOUND);
})

app.listen(3000, () => console.log('server is listenning on http://localhost:3000/'))