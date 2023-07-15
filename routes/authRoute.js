import express from "express";

import {
  rgisterController,
  loginController,
} from "../controller/registerController.js";
import { productController } from "../controller/productController.js";


const router = express.Router();
// ragister method post

router.post("/register", rgisterController);

// ragister method post
router.post("/login", loginController);

// product route
router.post("/product", productController);



export default router;
