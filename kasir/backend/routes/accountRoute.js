import express from "express";
import { getAccounts, getAccountById, createAccount, updateAccount, loginAccount } from "../controllers/accountController.js";

const router = express.Router();

router.get('/account', getAccounts);
router.get('/account/:id', getAccountById);
router.post('/account', createAccount);
router.patch('/account/:id', updateAccount);
router.post('/login/account', loginAccount);


export default router;