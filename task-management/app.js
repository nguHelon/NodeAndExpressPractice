import express from "express";
import dotenv from "dotenv";
import connect from "./db/connection.js"

const app = express();
dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello");
})

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connect(MONGO_URI);
        console.log("connected to mongodb");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}...`)
        })
    } catch (err) {
        console.log(err);
    }
}

start();