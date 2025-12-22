const { Router } = require("express");
const {
  getAllRarities,
  getSelectedRarity,
  getNewRarity,
  postNewRarity,
  deleteRarity,
} = require("../controllers/raritiesController");

const raritiesRouter = Router();

raritiesRouter.get("/", getAllRarities);

raritiesRouter.get("/new", getNewRarity);
raritiesRouter.post("/new", postNewRarity);

raritiesRouter.get("/:id", getSelectedRarity);

raritiesRouter.post("/:id/delete", deleteRarity);

module.exports = raritiesRouter;
