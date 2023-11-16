import express from "express";
import { addTask, getTasks, getTask, updateTask, deleteTask } from "../controllers/tasks.js";

const router = express.Router();

router.get('/', getTasks);
router.get('/task/:id', getTask);
router.post('/addTask', addTask);
router.patch('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id', deleteTask);

export default router;