import { Router } from "express";
import {
  getProducts,
  createNewProduct,
  getProductById,
  deleteProductById,
  getTotalProducts,
  updateProductById,
  login,
  saveOrder
} from "../controllers/products.controller";

const router = Router();

router.get("/products", getProducts);

router.get("/products/count", getTotalProducts);

router.get("/products/:id", getProductById);

router.post("/login", login);

router.post("/save", saveOrder);

router.post("/products", createNewProduct);

router.delete("/products/:id", deleteProductById);

router.put("/products/:id", updateProductById);

export default router;
