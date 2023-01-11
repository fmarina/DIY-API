const express = require("express");
const { isAuthorized } = require("../middleware/middleware");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updatebyPatch,
} = require("../controllers/product");
const router = express.Router();

router.get("/", isAuthorized, (req, res) =>
  res
    .send("Hi there, welcome to my Product API!")
    .catch((error) => res.status(400).json({ error }))
);

router.get("/products", isAuthorized, getProducts);

router.get("/products/:id", isAuthorized, getProductById);

router.post("/product", isAuthorized, createProduct);

router.put("/product/:id", isAuthorized, updateProduct);

router.delete("/product/:id", isAuthorized, deleteProduct);

router.patch("/product/:id", isAuthorized, updatebyPatch);

module.exports = router;
