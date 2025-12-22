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

async function getNewRarity(req, res) {
  res.render("newRarity", {
    title: "Inventory | New Rarity",
    prevData: { rarity_name: "" },
  });
}

const validateRarity = [
  body("rarity_name")
    .notEmpty()
    .withMessage("Rarity name cannot be empty")
    .isLength({ min: 1, max: 255 })
    .withMessage("Rarity name length must be between 1-255 characters"),
];

const postNewRarity = [
  validateRarity,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const prevData = matchedData(req, { onlyValidData: false });

      return res.status(400).render("newRarity", {
        title: "Inventory | New Rarity",
        errors: errors.array(),
        prevData: prevData,
      });
    }

    const newRarity = matchedData(req);
    await db.addNewRarity(newRarity);
    res.redirect("/rarities");
  },
];

async function deleteRarity(req, res) {
  const { id } = req.params;

  await db.deleteRarity(id);

  res.redirect("/rarities");
}

module.exports = {
  getAllRarities,
  getSelectedRarity,
  getNewRarity,
  postNewRarity,
  deleteRarity,
};
