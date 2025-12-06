const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

async function getAllItems(req, res) {
  const items = await db.getAllItems();
  res.render("items", { title: "Inventory | Items", items: items });
}

async function getSelectedItem(req, res) {
  const { id } = req.params;
  const item = await db.getSelectedItem(id);
  res.render("selectedItem", { title: "Inventory | Item", item: item[0] });
}

async function getNewItem(req, res) {
  const categories = await db.getAllCategories();
  const rarities = await db.getAllRarities();
  res.render("newItem", {
    title: "Inventory | New Item",
    categories: categories,
    rarities: rarities,
    prevData: {
      item_name: "",
      item_description: "",
      item_category: null,
      item_rarity: null,
      item_quantity: "",
      item_gold_cost: "",
    },
  });
}

const validateItem = [
  body("item_name")
    .notEmpty()
    .withMessage("Item name cannot be empty")
    .isLength({ min: 1, max: 255 })
    .withMessage("Item name length must be between 1-255 characters"),
  body("item_description")
    .notEmpty()
    .withMessage("Item description cannot be empty")
    .isLength({ min: 1, max: 255 })
    .withMessage("Item description length must be between 1-255 characters"),
  body("item_category").notEmpty().withMessage("Item category cannot be empty"),
  body("item_rarity").notEmpty().withMessage("Item rarity cannot be empty"),
  body("item_quantity")
    .notEmpty()
    .withMessage("Item quantity cannot be empty")
    .isNumeric({ no_symbols: true })
    .withMessage("Item quantity must be a numeric value with no symbols")
    .isInt({ min: 0, max: 99 })
    .withMessage("Item quantity value must be between 0-99"),
  body("item_gold_cost")
    .notEmpty()
    .withMessage("Item cost cannot be empty")
    .isNumeric({ no_symbols: true })
    .withMessage("Item cost must be a numeric value with no symbols")
    .isInt({ min: 0 })
    .withMessage("Item cost value must be 0 or greater"),
];

const postNewItem = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const prevData = matchedData(req, { onlyValidData: false });

      const categories = await db.getAllCategories();
      const rarities = await db.getAllRarities();

      return res.status(400).render("newItem", {
        title: "Inventory | New Item",
        categories: categories,
        rarities: rarities,
        errors: errors.array(),
        prevData: prevData,
      });
    }

    res.redirect("/items");
  },
];

module.exports = { getAllItems, getSelectedItem, getNewItem, postNewItem };

// todo: db-add item, css form
