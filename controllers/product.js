const Product = require("../models/product");

const getProducts = (req, res) => {
  Product.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const getProductById = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const createProduct = (req, res) => {
  if (!req.body.name || !req.body.code || !req.body.stock) {
    res
      .status(400)
      .send({ message: "Product must have a name, code and stock" });

    return;
  }
  const product = new Product({
    name: req.body.name,
    code: req.body.code,
    stock: req.body.stock,
  });

  product
    .save(product)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, code, stock } = req.body;
  if (!req.body.name || !req.body.code || !req.body.stock) {
    res
      .status(400)
      .send({ message: "Product must have a name, code and stock" });
    return;
  }
  Product.updateOne({ _id: id }, { name, code, stock })
    .then(() =>
      res.json({ message: "The product has been successfully updated" })
    )
    .catch((error) => res.json({ message: error }));
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  Product.remove({ _id: id })
    .then(() =>
      res.json({ message: "The product has been successfully deleted" })
    )
    .catch((error) => res.json({ message: error }));
};

const updatebyPatch = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  Product.updateOne({ _id: id }, body)
    .then((data) => {
      if (data.acknowledged) {
        res.json({
          message:
            "The product has been successfully updated by the patch method",
        });
      } else {
        res.json({
          message: "the field you want to update is unacknowledged",
        });
      }
    })
    .catch((error) => res.json({ message: error }));
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updatebyPatch,
};
