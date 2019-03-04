const fs = require("fs");
const path = require("path");
const util = require("util");
const checkUserValidity = require("./helpers/checkUserValidity");
const checkProductValidity = require("./helpers/checkProductValidity");

const filePath = path.join(__dirname, "../../db/orders/");
const writeFile = util.promisify(fs.writeFile);

const createOrder = (request, response) => {
  const order = request.body;

  const sendResponse = () => {
    response.status(201);
    response.json({
      status: "success",
      user: orderData
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: "order was not saved. Either a product or a user does not exist.",
      status: "failed",
      order: null
    });
  };

  console.log("user: ", checkUserValidity(order.user));
  console.log("product: ", checkProductValidity(order.products));

  if (!checkUserValidity(order.user) || !checkProductValidity(order.products)) {
    sendError();
    return;
  }

  const orderData = { ...order, id: Date.now() };

  const fileName = `order-${orderData.id}`;

  // const arrDB = JSON.parse(
  //   fs.readFileSync(filePath, (err, data) => {
  //     if (err) throw err;
  //     console.log(data);
  //   })
  // );
  // const newArrDB = { orders: [...arrDB.orders, orderData] };

  // const newArrDBStr = JSON.stringify(newArrDB);

  saveNewOrder(fileName, orderData)
    .then(sendResponse)
    .catch(sendError);
};

const saveNewOrder = (name, data) => {
  const src = path.resolve(filePath, name + ".json");
  const dataStr = JSON.stringify(data);

  return writeFile(src, dataStr);
};

module.exports = createOrder;
