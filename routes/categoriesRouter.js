const { Router } = require("express");
const {
  getAllCategories,
  getSelectedCategory,
  getNewCategory,
  postNewCategory,
  deleteCategory,
  getEditCategory,
  postEditCategory,
} = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", getAllCategories);

categoriesRouter.get("/new", getNewCategory);
categoriesRouter.post("/new", postNewCategory);

categoriesRouter.get("/:id", getSelectedCategory);

categoriesRouter.post("/:id/delete", deleteCategory);

categoriesRouter.get("/:id/edit", getEditCategory);
categoriesRouter.post("/:id/edit", postEditCategory);

module.exports = categoriesRouter;
