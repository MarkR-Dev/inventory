const { Router } = require("express");
const {
  getAllItems,
  getSelectedItem,
  getNewItem,
  postNewItem,
  deleteItem,
} = require("../controllers/itemsController");

const itemsRouter = Router();

itemsRouter.get("/", getAllItems);

itemsRouter.get("/new", getNewItem);
itemsRouter.post("/new", postNewItem);

itemsRouter.get("/:id", getSelectedItem);
itemsRouter.post("/:id/delete", deleteItem);

module.exports = itemsRouter;
