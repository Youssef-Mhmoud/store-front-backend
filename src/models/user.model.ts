import User from '../types/user.type';
import db from '../database';

class UserModel {
  // Create
  async create(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO users (email, user_name, last_name, password, phone)
      values ($1, $2, $3, $4, $5) returning *
      `;

      // run query
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.last_name,
        u.password,
        u.phone,
      ]);

      // release connection
      connection.release();

      // return created user
      return result.rows[0];
    } catch (error) {
      throw new Error('Unable Create User');
    }
  }
}

export default UserModel;
