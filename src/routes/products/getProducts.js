const path = require("path");
const url = require("url");
const qs = require("querystring");
const filterByMultipleIds = require("./filterByMultipleIds.js");
const filterByCategory = require("./filterByCategory.js");

const getProducts = (request, response) => {
  if (request.method !== "GET") {
    console.log("No handler for methods other that GET");
    return;
  }

  const parsedUrl = url.parse(request.url);
  let res = [];

  if (!parsedUrl.query) return;
  const query = parsedUrl.query;
  const queryObj = qs.parse(query);
  if ("ids" in queryObj) {
    const idsArr = queryObj.ids.split(",");
    res = filterByMultipleIds(idsArr);
  } else if ("category" in queryObj) {
    res = filterByCategory(queryObj.category);
  } else {
    console.log("Something went wrong!");
  }

  const status = res.length === 0 ? "no products" : "success";

  const resp = JSON.stringify({
    status: status,
    products: res
  });

  response.writeHead(200, {
    "Content-Type": "application/json"
  });
  response.end(resp);
};

module.exports = getProducts;
