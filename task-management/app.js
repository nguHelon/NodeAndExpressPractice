import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connect from "./db/connection.js";
import taskRouter from "./routes/tasks.js";
import authRouter from "./routes/users.js";
import userRouter from "./routes/userActions.js";

const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(cookieParser());

// route middlewares
app.use('/api/tasks', taskRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);

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