import express from "express";
import { addTask, getTasks, getTask, updateTask, deleteTask } from "../controllers/tasks.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.get('/', getTasks);
router.get('/task/:id', getTask);
router.post('/addTask/:userId', verifyToken, addTask);
router.patch('/updateTask/:id', verifyToken, updateTask);
router.delete('/deleteTask/:id', verifyToken, deleteTask);

export default router;