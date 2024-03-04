import express from "express";
import addProduct from "./src/controllers/addProduct.js";

const routes = (app) => {
  app.use(express.json());
  app.use("/api/product/add", addProduct);
  
};

export default routes;
