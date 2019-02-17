const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../db/products/add-products.json");
const arrDB = JSON.parse(
  fs.readFileSync(filePath, (err, data) => {
    if (err) throw err;
    console.log(data);
  })
);

const filterByCategory = category =>
  arrDB.filter(el => el.categories.includes(category));

module.exports = filterByCategory;
