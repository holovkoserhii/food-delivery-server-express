const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../../db/products/add-products.json");
const arrDB = JSON.parse(
  fs.readFileSync(filePath, (err, data) => {
    if (err) throw err;
    console.log(data);
  })
);

const existingProducts = arrDB.map(el => el.id);

const checkProductValidity = arr =>
  arr.every(el => existingProducts.includes(el));
module.exports = checkProductValidity;
