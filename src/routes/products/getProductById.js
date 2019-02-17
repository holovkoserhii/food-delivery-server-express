const filterById = require("./filterById.js");

const getProductById = (request, response) => {
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

module.exports = getProductById;
