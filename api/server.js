import http from 'http';
const port = process.env.PORT;
import app from './app.js';

const server = http.createServer(app);

try {
    server.listen(port);
    console.log(`Server listening on http://localhost:${port}`);
} catch (err) {
    console.log(err);
}