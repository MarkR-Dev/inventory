const { Router } = require("express");
const {
  getAllRarities,
  getSelectedRarity,
  getNewRarity,
  postNewRarity,
} = require("../controllers/raritiesController");

const raritiesRouter = Router();

raritiesRouter.get("/", getAllRarities);

raritiesRouter.get("/new", getNewRarity);
raritiesRouter.post("/new", postNewRarity);

raritiesRouter.get("/:id", getSelectedRarity);

module.exports = raritiesRouter;
