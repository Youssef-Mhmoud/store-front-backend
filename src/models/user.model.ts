import User from '../types/user.type';
import db from '../database';

class UserModel {
  // Create
  async create(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, phone, password )
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, user_name, first_name, last_name, phone`;

      // run query
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        u.phone,
        u.password,
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
  // Get All Users
  async getMany(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id, email, user_name, first_name, last_name, phone FROM users`;

      // run query
      const result = await connection.query(sql);

      // release connection
      connection.release();

      // return created user
      return result.rows;
    } catch (error) {
      throw new Error(`Error Retrieving users ${(error as Error).message}`);
    }
  }
  // Get Specific User
  async getOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id, email, user_name, first_name, last_name, phone FROM users
      WHERE id=($1)`;

      // run query
      const result = await connection.query(sql, [id]);

      // release connection
      connection.release();

      // return created user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't find user ID ${id} ${(error as Error).message}`
      );
    }
  }
  // Update User
  async updateOne(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE users 
        SET email=$1, user_name=$2, first_name=$3, last_name=$4, phone=$5, password=$6
        WHERE id=$7
        RETURNING id, email, user_name, first_name, last_name, phone`;

      // run query
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        u.phone,
        u.password,
        u.id,
      ]);

      // release connection
      connection.release();

      // return created user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't Update user: ${u.user_name}, ${(error as Error).message}`
      );
    }
  }
  // Delete User
  async deleteOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM users 
        WHERE id=($1)
        RETURNING id, email, user_name, first_name, last_name, phone`;

      // run query
      const result = await connection.query(sql, [id]);

      // release connection
      connection.release();

      // return created user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't Delete user ID ${id} ${(error as Error).message}`
      );
    }
  }
}

export default UserModel;
