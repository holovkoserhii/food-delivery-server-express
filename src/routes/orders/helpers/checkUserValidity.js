const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../../db/users/all-users.json");
const arrDB = JSON.parse(
  fs.readFileSync(filePath, (err, data) => {
    if (err) throw err;
    console.log(data);
  })
);

const existingUsers = arrDB.users.map(el => el.id);

const checkUserValidity = id => existingUsers.includes(id);
module.exports = checkUserValidity;
