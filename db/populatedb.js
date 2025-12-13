#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `
CREATE TABLE IF NOT EXISTS rarities (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  rarity_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  item_name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  rarity_id INTEGER REFERENCES rarities(id) ON DELETE SET NULL,
  gold_cost INTEGER CHECK(gold_cost >= 0) NOT NULL,
  quantity INTEGER CHECK(quantity >= 0) NOT NULL
);

INSERT INTO rarities (rarity_name) VALUES ('Common');
INSERT INTO rarities (rarity_name) VALUES ('Uncommon');
INSERT INTO rarities (rarity_name) VALUES ('Rare');

INSERT INTO categories (category_name) VALUES ('Weapon');
INSERT INTO categories (category_name) VALUES ('Armour');
INSERT INTO categories (category_name) VALUES ('Spell');

INSERT INTO items (item_name, description, category_id, rarity_id, gold_cost, quantity)
VALUES ('Iron Sword', 'A basic iron sword', 1, 1, 10, 5);

INSERT INTO items (item_name, description, category_id, rarity_id, gold_cost, quantity)
VALUES ('Steel Sword', 'A sturdy steel sword', 1, 2, 20, 3);

INSERT INTO items (item_name, description, category_id, rarity_id, gold_cost, quantity)
VALUES ('Dusk Gloves', 'Gloves made from thick leather', 2, 1, 10, 7);

INSERT INTO items (item_name, description, category_id, rarity_id, gold_cost, quantity)
VALUES ('Scroll of Fireball', 'A fireball spell scroll', 3, 3, 100, 1);
`;

const connectionString = argv[2];

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

main();
