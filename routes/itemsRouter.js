const { Router } = require("express");
const {
  getAllItems,
  getSelectedItem,
} = require("../controllers/itemsController");

const itemsRouter = Router();

itemsRouter.get("/", getAllItems);

itemsRouter.get("/new", (req, res) => {
  res.send("123 /new");
});

itemsRouter.get("/:id", getSelectedItem);

module.exports = itemsRouter;
