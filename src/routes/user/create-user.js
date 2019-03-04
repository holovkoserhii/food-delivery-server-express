const fs = require("fs");
const path = require("path");
const util = require("util");

const filePath = path.join(__dirname, "../../db/users/all-users.json");
const writeFile = util.promisify(fs.writeFile);

const createUser = (request, response) => {
  console.log("start creating a user");
  const user = request.body;
  const userData = { ...user, id: Date.now() };

  const arrDB = JSON.parse(
    fs.readFileSync(filePath, (err, data) => {
      if (err) throw err;
      console.log(data);
    })
  );
  const newArrDB = { users: [...arrDB.users, userData] };

  const newArrDBStr = JSON.stringify(newArrDB);

  const sendResponse = () => {
    response.json({
      status: "success",
      user: userData
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: "user was not saved"
    });
  };

  writeFile(filePath, newArrDBStr)
    .then(sendResponse)
    .catch(sendError);
};

module.exports = createUser;
