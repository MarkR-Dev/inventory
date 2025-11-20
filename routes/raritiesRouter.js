const { Router } = require("express");

const raritiesRouter = Router();

raritiesRouter.get("/", (req, res) => {
  res.render("rarities", { title: "Inventory | Rarities" });
});

module.exports = raritiesRouter;
