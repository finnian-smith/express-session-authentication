import { pool } from "./pool.js";

const db = {
  async getUserById(id) {
    try {
      const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [
        id,
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Could not fetch user");
    }
  },

  async getUserByUsername(username) {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
      );
      return rows[0];
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Could not fetch user");
    }
  },

  async createUser(username, hash, salt, admin = false) {
    try {
      await pool.query(
        `INSERT INTO users (username, hash, salt, admin)
            VALUES ($1, $2, $3, $4)`,
        [username, hash, salt, admin]
      );
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Could not insert user");
    }
  },
};

export default db;
