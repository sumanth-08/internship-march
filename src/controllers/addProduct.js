import { Router } from "express";
import initProductData from "../models/productModel.js";
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { product_name, price } = req.body;
    const product = await initProductData();

    await product.create({
      product_name: product_name,
      price: price,
    });
    return res.status(200).send("Everything worked");
  } catch (err) {
    console.log(err.stack);
    return res.status(500).send("Something went wrong");
  }
});

export default router;
