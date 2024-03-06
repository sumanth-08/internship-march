import express from "express";
import addProduct from "./src/controllers/addProduct.js";
import listProduct from "./src/controllers/listProduct.js";

const routes = (app) => {
  app.use(express.json());
  app.use("/api/product/add", addProduct);
  app.use("/api/product/list", listProduct);
};

export default routes;
