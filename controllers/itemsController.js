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

module.exports = { getAllItems, getSelectedItem };
