const db = require("../db/queries");

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
  });
}

async function postNewItem(req, res) {
  console.log("in items post middleware");
  res.redirect("/items");
}

module.exports = { getAllItems, getSelectedItem, getNewItem, postNewItem };
