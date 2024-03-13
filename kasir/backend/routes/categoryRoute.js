import express from "express";
import { getCategory, createCategory, deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.get('/kategori/:id_admin', getCategory);
router.post('/kategori', createCategory);
router.delete('/kategori/:id', deleteCategory);

export default router;