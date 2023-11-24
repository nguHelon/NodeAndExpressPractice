import express from "express";
import { signIn, logIn, logOut } from "../controllers/users.js";

const router = express.Router();

router.post('/signin', signIn);
router.post('/login', logIn);
router.get('/logout', logOut);

export default router;