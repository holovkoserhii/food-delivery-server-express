const express = require("express");
const mainRoute = require("./main/main");
const getImageRoute = require("./image/get-image");
const getUser = require("./user/get-user");
const getSaveImageHandlers = require("./image/save-image-multipart");
const createUser = require("./user/create-user");
const getProductById = require("./products/getProductById");
const getProducts = require("./products/getProducts");

const apiRoutes = express.Router();

const middlewareExample = (req, resp, next) => {
  console.log(req.body);
  if (req.body.userName) {
    next();
    return;
  }

  resp.status(400);
  resp.json({
    error: 'user has no "name" field'
  });
};

apiRoutes
  .get("/", mainRoute)
  .get("/image", getImageRoute)
  .get("/products/:id", getProductById)
  .get("/products", getProducts)
  .get("/users/:id", getUser)
  .post("/users", middlewareExample, createUser)
  .post("/image", getSaveImageHandlers());

module.exports = apiRoutes;
