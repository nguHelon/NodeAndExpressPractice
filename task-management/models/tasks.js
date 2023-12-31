import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "on-hold"
    },
    taskOwner: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

export default Task;