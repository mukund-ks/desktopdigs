import mongoose from 'mongoose';
import Express from 'express';
const app = Express();
import bodyParser from 'body-parser';
import logger from 'morgan';
import imageRoutes from './routes/image.js';
import userRoutes from './routes/user.js';
import staticRoute from './routes/static.js';

try {
    mongoose.connect(`mongodb+srv://mukundKS:${process.env.MONGODB_PASS}@ddcluster.p4gf2tv.mongodb.net/?retryWrites=true&w=majority`)
} catch (err) {
    console.log(err);
}

app.use(Express.static('public'));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

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