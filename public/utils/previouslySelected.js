const prevSelectedCategory = document.querySelector(`[data-category="true"]`);
const categorySelect = document.querySelector("#item_category");

const prevSelectedRarity = document.querySelector(`[data-rarity="true"]`);
const raritySelect = document.querySelector("#item_rarity");

// Set the value of the select to the previous selected value on form page reload
if (prevSelectedCategory) {
  categorySelect.value = prevSelectedCategory.value;
}

if (prevSelectedRarity) {
  raritySelect.value = prevSelectedRarity.value;
}
