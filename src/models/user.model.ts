import client from '../database';
import { User } from '../types/userType';
import bcrypt from 'bcrypt';
import config from '../config/config';

const pepper = config.pepper;

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
        'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *';
      const hash = bcrypt.hashSync(
        (u.password as string) + parseInt(pepper as string),
        parseInt(config.salt as string)
      );

      const result = await connection.query(sqls, [u.first_name, u.last_name, hash]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cann't Create User ${error}`);
    }
  }
  // Update User
  async update(u: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sqls =
        'UPDATE users SET first_name=$1, last_name=$2, password=$3 WHERE id=$4 RETURNING *';

      const result = await connection.query(sqls, [
        u.first_name,
        u.last_name,
        u.password,
        u.id,
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
  // Authenticate
  async authenticate(id: number, password: string): Promise<User | null> {
    const connection = await client.connect();
    const sql = 'SELECT password FROM users WHERE id=($1)';

    const result = await connection.query(sql, [id]);

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }
    return null;
  }
}
