import User from "../models/users.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs"

const getUser = async (req, res, next) => {
    const { id: userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            next(errorHandler(404, "User not found"));
        }

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    let { password, username } = req.body;
    const { id: userId } = req.params;

    try {
        if (req.user.id == userId || req.user.admin) {
            if (password) {
                password = bcryptjs.hashSync(password, process.env.TOKEN_SECRET);
            }

            const updateUser = await User.findByIdAndUpdate(userId, { password, username }, { new: true })

            const { password: pass, ...rest } = updateUser._doc;

            res.status(200).json(rest);
        } else if ((req.user.id != userId || !req.user.admin)) {
            next(errorHandler(401, "You are not allowed to update a user except yourself"));
        }
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    const { id: userId } = req.params;

    try {
        if (req.user.id == userId || req.user.admin) {
            await User.findByIdAndDelete(userId);
            res.clearCookie("access_token");
            res.status(200).json("User deleted successfully");
        } else if (req.user.id != userId || !req.body.admin) {
            next(errorHandler(401, "You are not allowed to update a user except yourself"));
        }
    } catch (err) {
        next(err);
    }
}

export {
    getUser,
    updateUser,
    deleteUser
};