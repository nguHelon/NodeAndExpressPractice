import Task from "../models/tasks.js";
import errorHandler from "../utils/error.js";

const addTask = async (req, res, next) => {
    const task = req.body;
    const newTask = new Task(task);

    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
}

const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
}

const getTask = async (req, res, next) => {
    const { id: taskId } = req.params;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            next(errorHandler(404, `no task with the ID: ${taskId}!`));
            return;
        }

        return res.status(200).json(task);
    } catch (err) {
        next(err);
    }
}

const updateTask = async (req, res, next) => {
    const { id: taskId } = req.params;

    try {
        const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
            new: true
        });

        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
}

const deleteTask = async (req, res, next) => {
    const { id: taskId } = req.params;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return next(errorHandler(404, `The task with ID ${taskId} that you are trying to delete does not exist!`));
        }

        await Task.findByIdAndDelete(taskId);
        res.status(200).json("task deleted successfully");
    } catch (err) {
        next(err)
    }
}

export {
    getTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask
};