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
     VALUES ($1, $2, $3, $4, $5, $6);`,
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

async function updateItem(item) {
  const {
    item_name,
    item_description,
    item_category,
    item_rarity,
    item_gold_cost,
    item_quantity,
    item_id,
  } = item;

  await pool.query(
    `
    UPDATE items
    SET item_name = $1, description = $2, category_id = $3, rarity_id = $4, gold_cost = $5, quantity = $6
    WHERE id = $7;
    `,
    [
      item_name,
      item_description,
      item_category,
      item_rarity,
      item_gold_cost,
      item_quantity,
      item_id,
    ]
  );
}

async function getSelectedCategoryItems(id) {
  const { rows } = await pool.query(
    `SELECT items.id, item_name, description, categories.category_name, rarities.rarity_name, quantity, gold_cost FROM items 
     LEFT JOIN categories ON items.category_id = categories.id 
     LEFT JOIN rarities ON items.rarity_id = rarities.id
     WHERE category_id = $1
     ORDER BY item_name;`,
    [id]
  );
  return rows;
}

async function getSelectedCategory(id) {
  const { rows } = await pool.query(`SELECT * FROM categories WHERE id = $1`, [
    id,
  ]);
  return rows;
}

async function addNewCategory(category) {
  const { category_name } = category;

  await pool.query(
    `
    INSERT INTO categories (category_name) VALUES ($1);
    `,
    [category_name]
  );
}

async function deleteCategory(id) {
  await pool.query(`DELETE FROM categories WHERE id = $1`, [id]);
}

async function updateCategory(category) {
  const { category_id, category_name } = category;
  await pool.query(
    `
    UPDATE categories
    SET category_name = $1
    WHERE id = $2;
    `,
    [category_name, category_id]
  );
}

async function getSelectedRarity(id) {
  const { rows } = await pool.query(
    `
    SELECT * from rarities
    WHERE id = $1;
    `,
    [id]
  );
  return rows;
}

async function getSelectedRarityItems(id) {
  const { rows } = await pool.query(
    `SELECT items.id, item_name, description, categories.category_name, rarities.rarity_name, quantity, gold_cost FROM items 
     LEFT JOIN categories ON items.category_id = categories.id 
     LEFT JOIN rarities ON items.rarity_id = rarities.id
     WHERE rarity_id = $1
     ORDER BY item_name;`,
    [id]
  );
  return rows;
}

async function addNewRarity(rarity) {
  const { rarity_name } = rarity;
  await pool.query(
    `
    INSERT INTO rarities (rarity_name) VALUES ($1);
    `,
    [rarity_name]
  );
}

async function deleteRarity(id) {
  await pool.query(
    `
    DELETE FROM rarities
    WHERE id = $1;
    `,
    [id]
  );
}

async function updateRarity(rarity) {
  const { rarity_id, rarity_name } = rarity;
  await pool.query(
    `
    UPDATE rarities
    SET rarity_name = $1
    WHERE id = $2;
    `,
    [rarity_name, rarity_id]
  );
}

module.exports = {
  getAllItems,
  getSelectedItem,
  getAllCategories,
  getAllRarities,
  addNewItem,
  deleteItem,
  updateItem,
  getSelectedCategoryItems,
  getSelectedCategory,
  addNewCategory,
  deleteCategory,
  updateCategory,
  getSelectedRarity,
  getSelectedRarityItems,
  addNewRarity,
  deleteRarity,
  updateRarity,
};
