/* eslint-disable import/named */
/*
  This script generates mock data for local development.
  This way you don't have to point to an acual API,
  but you can enjoy realistic, but randomized data,
  and rapide page loads due to local, static data.
 */

/* eslint-disable no-console */
import { generate, extend } from "json-schema-faker";
import { schema } from "./mockDataSchema";
import fs from "fs";
import chalk from "chalk";

// Extend JSF with the faker libs you want to you use
extend("faker", () => require("faker"));
const json = JSON.stringify(generate(schema));

fs.writeFile("./src/api/db.json", json, function (err) {
  if (err) {
    return console.log(chalk.red(err));
  } else {
    console.log(chalk.green("Mock data generated"));
  }
});
