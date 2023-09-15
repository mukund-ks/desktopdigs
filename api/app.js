import bodyParser from 'body-parser';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import Express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import imageRoutes from './routes/image.js';
import staticRoute from './routes/static.js';
import userRoutes from './routes/user.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname)

configDotenv({ path: __dirname + '/.env' });

const app = Express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://desktopdigs.vercel.app',
    'https://desktopdigs-mukund-ks.vercel.app',
    'https://desktopdigs-git-main-mukund-ks.vercel.app',
];
const corsOptions = {
    origin: allowedOrigins,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
};

try {
    mongoose.connect(`mongodb+srv://mukundKS:${process.env.MONGODB_PASS}@ddcluster.p4gf2tv.mongodb.net/?retryWrites=true&w=majority`);
} catch (err) {
    console.log(err);
}

app.use(Express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors(corsOptions));

app.use('/', staticRoute);

app.use('/api/images', imageRoutes);

app.use('/api/user', userRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    });
});

export default app;