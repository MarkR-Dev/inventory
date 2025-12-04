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

// todo: add in other prevData
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
    },
  });
}

// todo: add in other form input validation
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
];

// todo: add in other form input prevData
const postNewItem = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const prevData = {
        item_name: req.body.item_name,
        item_description: req.body.item_description,
        item_category: req.body.item_category || null,
        item_rarity: req.body.item_rarity || null,
      };

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
