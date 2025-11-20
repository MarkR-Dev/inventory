const { Router } = require("express");

const categoriesRouter = Router();

categoriesRouter.get("/", (req, res) => {
  res.render("categories", { title: "Inventory | Categories" });
});

module.exports = categoriesRouter;
