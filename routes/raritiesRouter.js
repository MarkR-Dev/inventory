const { Router } = require("express");
const { getAllRarities } = require("../controllers/raritiesController");

const raritiesRouter = Router();

raritiesRouter.get("/", getAllRarities);

module.exports = raritiesRouter;
