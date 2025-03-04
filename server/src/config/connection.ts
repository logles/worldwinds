//config: This folder is used to store configuration files. These might include environment variables, database configurations, and any other settings that your application needs to run. Keeping these in a separate folder helps manage different environments (development, testing, production).

import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

// Initialize a Sequelize instance to connect to the PostgreSQL database.
// If DB_URL is provided in the environment variables, use it directly.
// Otherwise, use individual environment variables for database name, user, and password.
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || "",
      process.env.DB_USER || "",
      process.env.DB_PASSWORD,
      {
        host: "localhost", // Database host
        dialect: "postgres", // Database dialect (PostgreSQL)
        dialectOptions: {
          decimalNumbers: true, // Ensure decimal numbers are handled correctly
        },
      }
    );

export default sequelize;
