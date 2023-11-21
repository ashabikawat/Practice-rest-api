const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

// Read
app.get("/products", function (req, res) {
  res.json(products);
});

app.get("/products/:id", function (req, res) {
  const id = +req.params.id;
  const product = products.find((product) => product.id === id);
  res.json(product);
});

// Create

app.post("/products", function (req, res) {
  //   console.log(req.body);

  products.push(req.body);

  res.json("product created successfully");
});

// update
app.put("/products/:id", function (req, res) {
  const id = +req.params.id;

  let productIndex = products.findIndex((product) => product.id === id);

  products.splice(productIndex, 1, { id, ...req.body });

  res.json("product updated successfully");
});

app.patch("/products/:id", function (req, res) {
  const id = +req.params.id;

  const productIndex = products.findIndex((product) => product.id === id);

  const product = products[productIndex];

  products.splice(productIndex, 0, { ...product, ...req.body });
  res.json("product updated successfully");
});

// delete
app.delete("/products/:id", function (req, res) {
  const id = +req.params.id;

  const productIndex = products.findIndex((product) => product.id === id);

  products.splice(productIndex, 1);

  res.json("product deleted successfully");
});

app.listen(8000, () => {
  console.log("server started");
});
