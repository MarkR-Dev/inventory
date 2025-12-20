const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

async function getAllRarities(req, res) {
  const rarities = await db.getAllRarities();

  res.render("rarities", { title: "Inventory | Rarities", rarities: rarities });
}

async function getSelectedRarity(req, res) {
  const { id } = req.params;
  const rarity = await db.getSelectedRarity(id);
  const rarityItems = await db.getSelectedRarityItems(id);

  res.render("selectedRarity", {
    title: "Inventory | Rarity",
    rarity: rarity[0],
    items: rarityItems,
  });
}

// async function getNewRarity(req, res) {
//   res.render("newRarity", {
//     title: "Inventory | New Rarity",
//     prevData: { rarity_name: "" },
//   });
// }

module.exports = { getAllRarities, getSelectedRarity };
