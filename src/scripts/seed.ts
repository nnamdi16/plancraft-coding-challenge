import MongoDBManager from "../infrastructure/databases/MongoDBManger";
import Permission from "../infrastructure/databases/Mongodb/models/Permission";
import config from "../config/index";
import fs from "fs";
import {logger} from "../infrastructure/logger";
import path from "path";
/**
 * Automatically loads all models and exports them
 */

  
 // eslint-disable-next-line no-underscore-dangle
 const _require = require;
const db = new MongoDBManager({ config, logger });



const permissions: any = [
  {
    name: "CREATE_ROLE"
  },
  {
    name: "CREATE_USER"
  },
  {
    name: "DELETE_USER"
  },
  {
    name: "LIST_USER"
  },
  {
    name: "RETRIEVE_USER"
  },
  {
    name: "CREATE_ROLE"
  },
]

const perm = [
  "CREATE",
  "UPDATE",
  "DELETE",
  "LIST",
  "RETRIEVE"
]


async function seedPermissions() {
  await Permission.deleteMany()
  await Permission.insertMany(permissions)
}

(async function run() {
  logger.info("Running seed script");
  try {
    await db.connect();
    await Promise.all([
      seedPermissions(),
    ]);

    await db.close();
    logger.info("Finished running seed script");
  } catch (error: any) {
    logger.error("An error occurred while seeding the database", {
      error: error.message || error.toString(),
      stack: error.stack,
    });
  }
}());

