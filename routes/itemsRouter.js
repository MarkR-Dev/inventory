const { Router } = require("express");
const { getAllItems } = require("../controllers/itemsController");

const itemsRouter = Router();

itemsRouter.get("/", getAllItems);

itemsRouter.get("/new", (req, res) => {
  res.send("123");
});

module.exports = itemsRouter;
