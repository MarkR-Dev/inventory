const { Router } = require("express");

const itemsRouter = Router();

itemsRouter.get("/", (req, res) => {
  res.render("items", { title: "Inventory | Items" });
});

module.exports = itemsRouter;
