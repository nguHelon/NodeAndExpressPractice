import express from "express";
import dotenv from "dotenv";
import connect from "./db/connection.js";
import taskRouter from "./routes/tasks.js";

const app = express();
dotenv.config();

// middlewares
app.use(express.json());

// route middlewares
app.use('/api/tasks', taskRouter)

// General error middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
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