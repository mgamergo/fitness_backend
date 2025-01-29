import express from "express";
import v1Router from "./api/v1/index";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', v1Router);

app.get('/', (req, res) => {
    res.json({"message": "Hello this is port 3000"})
})

app.listen(PORT, () => {
    console.log("Working")
})