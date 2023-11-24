import User from "../models/users.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const signIn = async (req, res, next) => {
    const { username, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json(`${username} created successfully!`);
    } catch (err) {
        next(err);
    }
}

const logIn = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            next(errorHandler(404, "user not found!"));
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            next(errorHandler(404, "Wrong credential"));
        }

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
        const { password: pass, ...rest } = user._doc;

        res.
            cookie("access_token", token, { httpOnly: true }).
            status(200).
            json(rest);


    } catch (err) {
        next(err);
    }
}

const logOut = async (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json("User logged Out successfully");
    } catch (err) {
        next(err);
    }
}

export {
    signIn,
    logIn,
    logOut
}