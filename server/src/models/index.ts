import sequelize from "../config/connection.js";
import { ProfileFactory } from "./profile.js";

const Profile = ProfileFactory(sequelize);

export { sequelize, Profile };
