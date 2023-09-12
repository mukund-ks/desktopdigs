import axios from "axios";

const PORT = 3000;
export default axios.create({ baseURL: `https://desktopdigs-api.vercel.app/` });