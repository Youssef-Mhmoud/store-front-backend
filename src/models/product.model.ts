import client from '../database';
import { Products } from '../types/productsType';

export class Product {
  // Show All Products
  async index(): Promise<Products[]> {
    try {
      const connection = await client.connect();
      const sqls = 'SELECT * FROM products';

      const result = await connection.query(sqls);

      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Cann't get Products ${error}`);
    }
  }
  // One Product
  async show(id: number): Promise<Products> {
    try {
      const connection = await client.connect();
      const sqls = 'SELECT * FROM products WHERE id=($1)';

      const result = await connection.query(sqls, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cann't find Product id: ${id}, ${error}`);
    }
  }
  // Create Product
  async create(p: Products): Promise<Products> {
    try {
      const connection = await client.connect();
      const sqls =
        'INSERT INTO products (id, name, price) VALUES ($1, $2, $3) RETURNING *';

      const result = await connection.query(sqls, [
        p.id,
        p.name,
        p.price,
      ]);

      connection.release();

      return result.rows[0]
    } catch (error) {
      throw new Error(`Cann't Create Product ${error}`);
    }
  }
  // Update Product
  async update(p: Products): Promise<Products> {
    try {
      const connection = await client.connect();
      const sqls = 'UPDATE products SET name=$1, price=$2 WHERE id=$3 RETURNING *';

      const result = await connection.query(sqls, [
        p.name,
        p.price,
        p.id,
      ]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cann't Update Product ${error}`);
    }
  }
  // DELETE Product
  async delete(id: string): Promise<Products> {
    try {
      const connection = await client.connect();
      const sqls = 'DELETE FROM products WHERE id=($1)';

      const result = await connection.query(sqls, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cann't Delete Product id: ${id}, ${error}`);
    }
  }
}

