const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../db/products/add-products.json");
const arrDB = JSON.parse(
  fs.readFileSync(filePath, (err, data) => {
    if (err) throw err;
    console.log(data);
  })
);

const filterById = id => arrDB.find(el => el.id === parseInt(id, 10));
module.exports = filterById;
