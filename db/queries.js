const pool = require("./pool");

// async function getAllItems() {
//   const { rows } = await pool.query("SELECT * FROM items;");
//   return rows;
// }

async function getAllItems() {
  const { rows } = await pool.query(
    `SELECT items.id, item_name, description, categories.category_name, rarities.rarity_name, quantity, gold_cost FROM items 
     LEFT JOIN categories ON items.category_id = categories.id 
     LEFT JOIN rarities ON items.rarity_id = rarities.id
     ORDER BY item_name;`
  );
  return rows;
}

module.exports = { getAllItems };
