import express from "express";
import addProduct from "./src/controllers/addProduct.js";
import listProduct from "./src/controllers/listProduct.js";
import listByID from "./src/controllers/listProductByID.js";
import search from "./src/controllers/search.js"

const routes = (app) => {
  app.use(express.json());
  app.use("/api/product/add", addProduct);
  app.use("/api/product/list", listProduct);
  app.use("/api/product/list_product", listByID); 
  app.use("/api/product/search",search)
};

export default routes;
