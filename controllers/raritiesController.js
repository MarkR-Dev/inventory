const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

async function getAllRarities(req, res) {
  const rarities = await db.getAllRarities();

  res.render("rarities", { title: "Inventory | Rarities", rarities: rarities });
}

module.exports = { getAllRarities };
