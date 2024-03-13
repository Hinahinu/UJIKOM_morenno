import express from "express";
import { getOrders, createOrder, countProductsSoldThisMonth, countUniqueOrdersByAdmin } from "../controllers/orderController.js";

const router = express.Router();

router.get('/pesanan/:id_admin', getOrders);
router.post('/pesanan', createOrder);
router.get('/sold/:id_admin', countProductsSoldThisMonth);
router.get('/pengunjung/:id_admin', countUniqueOrdersByAdmin);

export default router;