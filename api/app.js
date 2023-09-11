import bodyParser from 'body-parser';
import cors from 'cors';
import Express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import imageRoutes from './routes/image.js';
import staticRoute from './routes/static.js';
import userRoutes from './routes/user.js';

const app = Express();

const allowedOrigins = [
    'http://localhost:5173',
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

app.use(Express.static('public'));

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