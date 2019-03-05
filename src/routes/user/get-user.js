// const path = require("path");

// // const getUserFromDb = id => {
// //   const src = path.resolve(usersFolder, fileName + ".json");

// //   return readFileSync(src);
// // };
// const filterById = id => arrDB.find(el => el.id === parseInt(id, 10));

// const getUser = (request, response) => {
//   const id = request.params.id;

//   response.set("Content-Type", "application/json");

//   response.status(200);
//   response.json({ user: getUserFromDb(id) });
// };

// module.exports = getUser;

const filterById = require("./filterById.js");

const getUser = (request, response) => {
  const id = request.params.id;
  const res = filterById(id);

  const resp = JSON.stringify({
    status: "success",
    products: res
  });

  response.writeHead(200, {
    "Content-Type": "application/json"
  });
  response.end(resp);
};

module.exports = getUser;
