#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = ``;

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
