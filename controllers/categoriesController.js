const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();

  res.render("categories", {
    title: "Inventory | Categories",
    categories: categories,
  });
}

module.exports = { getAllCategories };
