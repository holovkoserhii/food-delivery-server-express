const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../db/products/add-products.json");
const arrDB = JSON.parse(
  fs.readFileSync(filePath, (err, data) => {
    if (err) throw err;
    console.log(data);
  })
);

const filterByMultipleIds = arrIds =>
  arrDB.filter(el => arrIds.includes(String(el.id)));

module.exports = filterByMultipleIds;
