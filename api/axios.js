import axios from "axios";

const PORT = 3000;
export default axios.create({ baseURL: `http://localhost:${PORT}` });