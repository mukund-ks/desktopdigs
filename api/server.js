import http from 'http';
import app from './app.js';
const port = process.env.PORT;

const server = http.createServer(app);

try {
    server.listen(port);
    console.log(`Server listening on http://localhost:${port}`);
} catch (err) {
    console.log(err);
}