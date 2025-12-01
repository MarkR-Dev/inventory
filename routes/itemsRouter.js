const { Router } = require("express");
const {
  getAllItems,
  getSelectedItem,
  getNewItem,
  postNewItem,
} = require("../controllers/itemsController");

const itemsRouter = Router();

itemsRouter.get("/", getAllItems);

itemsRouter.get("/new", getNewItem);
itemsRouter.post("/new", postNewItem);

itemsRouter.get("/:id", getSelectedItem);

module.exports = itemsRouter;
