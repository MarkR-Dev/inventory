const { Router } = require("express");
const {
  getAllCategories,
  getSelectedCategory,
  getNewCategory,
  postNewCategory,
} = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", getAllCategories);

categoriesRouter.get("/new", getNewCategory);
categoriesRouter.post("/new", postNewCategory);

categoriesRouter.get("/:id", getSelectedCategory);

module.exports = categoriesRouter;
