import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser, countUser } from "../controllers/userController.js";

const router = express.Router();

router.get('/users/:id_admin', getUsers);
router.get('/user/:id', getUserById);
router.post('/user', createUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.post('/login/user', loginUser);
router.get('/users/counts/:id_admin', countUser);


export default router;