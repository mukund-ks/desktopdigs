import { configDotenv } from 'dotenv';
import http from 'http';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

configDotenv({ path: __dirname + '/.env' });

const port = process.env.PORT;

const server = http.createServer(app);

try {
    server.listen(port);
    console.log(`Server listening on http://localhost:${port}`);
} catch (err) {
    console.log(err);
}