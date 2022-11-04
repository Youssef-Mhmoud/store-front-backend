import client from '../database';
import { User } from '../types/userType';
export class Users {
  // Show All Users
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sqls = 'SELECT * FROM users';

      const result = await connection.query(sqls);

      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Cann't get Users ${error}`);
    }
  }
  // One User
  async show(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sqls = 'SELECT * FROM users WHERE id=($1)';

      const result = await connection.query(sqls, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cann't find User who's id: ${id}, ${error}`);
    }
  }
  // Create User
  async create(u: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sqls =
        'INSERT INTO users (id, user_name, password) VALUES ($1, $2, $3) RETURNING *';

      const result = await connection.query(sqls, [
        u.id,
        u.user_name,
        u.password,
      ]);

      connection.release();

      return result.rows[0]
    } catch (error) {
      throw new Error(`Cann't Create User ${error}`);
    }
  }
  // Update User
  async update(u: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sqls = 'UPDATE users SET user_name=$1, password=$2 WHERE id=$3 RETURNING *';

      const result = await connection.query(sqls, [
        u.user_name,
        u.password,
        u.id
      ]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cann't Update User ${error}`);
    }
  }
  // DELETE User
  async delete(id: string): Promise<User> {
    try {
      const connection = await client.connect();
      const sqls = 'DELETE FROM users WHERE id=($1)';

      const result = await connection.query(sqls, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cann't Delete User Who's id: ${id}, ${error}`);
    }
  }
}

