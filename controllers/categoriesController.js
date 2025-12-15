const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();

  res.render("categories", {
    title: "Inventory | Categories",
    categories: categories,
  });
}

async function getSelectedCategory(req, res) {
  const { id } = req.params;
  const category = await db.getSelectedCategory(id);
  const categoryItems = await db.getSelectedCategoryItems(id);

  res.render("selectedCategory", {
    title: "Inventory | Category",
    items: categoryItems,
    category: category[0],
  });
}

module.exports = { getAllCategories, getSelectedCategory };
