import axios from "axios";

const PORT = 3000;
export default axios.create({ baseURL: `http://localhost:${PORT}` });
// console.log(`Axios created on http://localhost:${process.env.PORT}`)