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
    prevData: { item_name: "" },
  });
}

// todo: add in other form input validation
const validateItem = [
  body("item_name")
    .notEmpty()
    .withMessage("Item name cannot be empty")
    .isLength({ min: 1, max: 255 })
    .withMessage("Item name length must be between 1 and 255 characters"),
];

// todo: add in other form input prevData
const postNewItem = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const prevData = {
        item_name: req.body.item_name,
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

// todo: form validation -> add in other inputs/set empty prevdata, db-add item, css form
