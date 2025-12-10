const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query(
    `SELECT items.id, item_name, description, categories.category_name, rarities.rarity_name, quantity, gold_cost FROM items 
     LEFT JOIN categories ON items.category_id = categories.id 
     LEFT JOIN rarities ON items.rarity_id = rarities.id
     ORDER BY item_name;`
  );
  return rows;
}

async function getSelectedItem(id) {
  const { rows } = await pool.query(
    `SELECT items.id, item_name, description, categories.category_name, rarities.rarity_name, quantity, gold_cost, categories.id AS cat_id, rarities.id AS rarity_id FROM items 
     LEFT JOIN categories ON items.category_id = categories.id 
     LEFT JOIN rarities ON items.rarity_id = rarities.id
     WHERE items.id = $1;`,
    [id]
  );
  return rows;
}

async function getAllCategories() {
  const { rows } = await pool.query(`SELECT * FROM categories;`);
  return rows;
}

async function getAllRarities() {
  const { rows } = await pool.query(`SELECT * FROM rarities;`);
  return rows;
}

async function addNewItem(newItem) {
  const {
    item_name,
    item_description,
    item_category,
    item_rarity,
    item_gold_cost,
    item_quantity,
  } = newItem;

  await pool.query(
    `INSERT INTO items (item_name, description, category_id, rarity_id, gold_cost, quantity)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      item_name,
      item_description,
      item_category,
      item_rarity,
      item_gold_cost,
      item_quantity,
    ]
  );
}

async function deleteItem(id) {
  await pool.query(`DELETE FROM items WHERE id = $1;`, [id]);
}

module.exports = {
  getAllItems,
  getSelectedItem,
  getAllCategories,
  getAllRarities,
  addNewItem,
  deleteItem,
};
