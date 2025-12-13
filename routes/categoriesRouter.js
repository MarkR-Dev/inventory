const { Router } = require("express");
const { getAllCategories } = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", getAllCategories);

module.exports = categoriesRouter;
