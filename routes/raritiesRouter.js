const { Router } = require("express");
const {
  getAllRarities,
  getSelectedRarity,
} = require("../controllers/raritiesController");

const raritiesRouter = Router();

raritiesRouter.get("/", getAllRarities);

// raritiesRouter.get("/new", getNewRarity);

raritiesRouter.get("/:id", getSelectedRarity);

module.exports = raritiesRouter;
