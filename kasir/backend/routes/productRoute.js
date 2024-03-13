import express from "express";
import { getProducts, getProductById, saveProduct, updateProduct, deleteProduct, getProductsByIdAndCategory, countProduct } from "../controllers/productController.js";

const router = express.Router();

router.get('/products/:id_admin', getProducts);
router.get('/product/:id', getProductById);
router.post('/products', saveProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/:selectedCategory/:id_admin', getProductsByIdAndCategory);
router.get('/counts/:id_admin', countProduct);
// router.post('/login/account', loginAccount);


export default router;