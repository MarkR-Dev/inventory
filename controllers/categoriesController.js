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

async function getNewCategory(req, res) {
  res.render("newCategory", {
    title: "Inventory | New Category",
    prevData: { category_name: "" },
  });
}

const validateCategory = [
  body("category_name")
    .notEmpty()
    .withMessage("Category name cannot be empty")
    .isLength({ min: 1, max: 255 })
    .withMessage("Category name length must be between 1-255 characters"),
];

const postNewCategory = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const prevData = matchedData(req, { onlyValidData: false });

      return res.status(400).render("newCategory", {
        title: "Inventory | New Category",
        errors: errors.array(),
        prevData: prevData,
      });
    }

    const newCategory = matchedData(req);
    await db.addNewCategory(newCategory);

    res.redirect("/categories");
  },
];

async function deleteCategory(req, res) {
  const { id } = req.params;

  await db.deleteCategory(id);

  res.redirect("/categories");
}

async function getEditCategory(req, res) {
  const { id } = req.params;
  const prevData = await db.getSelectedCategory(id);

  res.render("editCategory", {
    title: "Inventory | Edit Category",
    prevData: prevData[0],
  });
}

const postEditCategory = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    const { id } = req.params;

    if (!errors.isEmpty()) {
      const prevData = matchedData(req, { onlyValidData: false });

      return res.status(400).render("editCategory", {
        title: "Inventory | Edit Category",
        errors: errors.array(),
        prevData: { id: id, category_name: prevData.category_name },
      });
    }

    const category = matchedData(req);
    await db.updateCategory({ category_id: id, ...category });

    res.redirect("/categories");
  },
];

module.exports = {
  getAllCategories,
  getSelectedCategory,
  getNewCategory,
  postNewCategory,
  deleteCategory,
  getEditCategory,
  postEditCategory,
};
