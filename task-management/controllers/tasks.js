import Task from "../models/tasks.js";
import errorHandler from "../utils/error.js";

const addTask = async (req, res, next) => {
    const { userId } = req.params;
    const task = req.body;
    const newTask = new Task({ ...task, taskOwner: userId });

    try {
        if (!req.user.admin) {
            return next(errorHandler(401, "You are not authorized to add tasks, only admins can"))
        }

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
        const task = await Task.findById(taskId);

        if (!task) {
            next(errorHandler(404, `There is no task with ID: ${taskId}`));
        }

        console.log(req.user.id, req.user.taskOwner)

        if (req.user.id == task.taskOwner || req.user.admin) {
            const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
                new: true
            });

            return res.status(200).json(task);
        } else if (req.user.id != task.taskOwner || !req.user.admin) {
            return next(errorHandler(401, "You are not authorized to update another person's task"));
        }


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

        if (req.user.id == task.taskOwner || req.user.admin) {
            await Task.findByIdAndDelete(taskId);
            return res.status(200).json("task deleted successfully");
        } else if (req.user.id != task.taskOwner || !req.user.admin) {
            return next(errorHandler(401, "You are not authorized to delete another persons's task"));
        }


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