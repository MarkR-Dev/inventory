const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Inventory | Home" });
});

module.exports = indexRouter;
