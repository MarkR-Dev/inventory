const { Router } = require("express");
const {
  getAllCategories,
  getSelectedCategory,
} = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", getAllCategories);

categoriesRouter.get("/:id", getSelectedCategory);

module.exports = categoriesRouter;
