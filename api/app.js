import mongoose from 'mongoose';
import Express from 'express';
const app = Express();
import bodyParser from 'body-parser';
import logger from 'morgan';
import imageRoutes from './routes/image.js';

try {
    mongoose.connect(`mongodb+srv://mukundKS:${process.env.MONGODB_PASS}@ddcluster.p4gf2tv.mongodb.net/?retryWrites=true&w=majority`)
} catch (err) {
    console.log(err);
}

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.get('/test', (req, res, next) => {
    res.json('test ok');
});

app.use('/images', imageRoutes);

app.use((req, res, next) => {
    const err = new Error("Not Found");
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