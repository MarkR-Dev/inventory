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
    `SELECT items.id, item_name, description, categories.category_name, rarities.rarity_name, quantity, gold_cost FROM items 
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

module.exports = {
  getAllItems,
  getSelectedItem,
  getAllCategories,
  getAllRarities,
};
