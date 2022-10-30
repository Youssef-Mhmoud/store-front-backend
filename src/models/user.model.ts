import User from '../types/user.type';
import db from '../database';

class UserModel {
  // Create
  async create(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, password, phone)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING * `;

      // run query
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        u.password,
        u.phone,
      ]);

      // release connection
      connection.release();

      // return created user
      return result.rows[0];
      
    } catch (error) {
      throw new Error(
        `Unable Create ${u.user_name}: ${(error as Error).message}`
      );
    }
  }
}

export default UserModel;
