import express from "express";
import verifyToken from "../utils/verifyToken.js"
import { getUser, updateUser, deleteUser } from "../controllers/userActions.js"

const router = express.Router();

router.get('/user/:id', getUser);
router.patch('/update-user/:id', verifyToken, updateUser);
router.delete('/delete-user/:id', verifyToken, deleteUser);

export default router;