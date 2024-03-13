import express from "express";
import addProduct from "./src/controllers/product/addProduct.js";
import listProduct from "./src/controllers/product/listProduct.js";
import listByID from "./src/controllers/product/listProductByID.js";
import search from "./src/controllers/product/search.js";
import deleteProduct from "./src/controllers/product/deleteProduct.js";
import editProduct from "./src/controllers/product/edirProduct.js";

import register from "./src/controllers/authorization/register.js";
import login from "./src/controllers/authorization/login.js";


const routes = (app) => {
  app.use(express.json());
  //product
  app.use("/api/product/add", addProduct);
  app.use("/api/product/list", listProduct);
  app.use("/api/product/list_product", listByID);
  app.use("/api/product/search", search);
  app.use("/api/product/delete", deleteProduct);
  app.use("/api/product/edit", editProduct);

  //auth
  app.use("/api/auth/register", register);
  app.use("/api/auth/login", login);

};

export default routes;
