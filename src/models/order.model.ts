import client from '../database';
import { Orders } from '../types/ordersType';

export class Order {
  // Show All Orders
  async index(): Promise<Orders[]> {
    try {
      const connection = await client.connect();
      const sqls = 'SELECT * FROM orders';

      const result = await connection.query(sqls);

      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Cann't get Orders ${error}`);
    }
  }
  // One Order
  async show(id: number): Promise<Orders> {
    try {
      const connection = await client.connect();
      const sqls = 'SELECT * FROM orders WHERE id=($1)';

      const result = await connection.query(sqls, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cann't find Order id: ${id}, ${error}`);
    }
  }
  // Create Order
  async create(o: Orders): Promise<Orders> {
    try {
      const connection = await client.connect();
      const sqls =
        'INSERT INTO orders (id, status, user_id) VALUES ($1, $2, $3) RETURNING *';

      const result = await connection.query(sqls, [
        o.id,
        o.status,
        o.user_id,
      ]);

      connection.release();

      return result.rows[0]
    } catch (error) {
      throw new Error(`Cann't Create Order_Product ${error}`);
    }
  }
  // Create Product order
  async createProduct(quantity: number, orderId: string, productId: string): Promise<Orders> {
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)'
      const connection = await client.connect()

      const result = await connection.query(ordersql, [orderId])

      const order = result.rows[0]

      if (order.status !== "open") {
        throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
      }

      connection.release()
    } catch (err) {
      throw new Error(`${err}`)
    }
    try {
      const connection = await client.connect();
      const sqls =
        'INSERT INTO order_products (quantity, order_id, products_id) VALUES ($1, $2, $3) RETURNING *';

      const result = await connection.query(sqls, [
        quantity,
        orderId,
        productId,
      ]);

      connection.release();

      return result.rows[0]
    } catch (error) {
      throw new Error(`Cann't Create Order_Product ${error}`);
    }
  }
  // Update Order
  async update(o: Orders): Promise<Orders> {
    try {
      const connection = await client.connect();
      const sqls = 'UPDATE orders SET status=$1, user_id=$2 WHERE id=$3 RETURNING *';

      const result = await connection.query(sqls, [
        o.status,
        o.user_id,
        o.id,
      ]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cann't Update Order ${error}`);
    }
  }
  // DELETE Order
  async delete(id: string): Promise<Orders> {
    try {
      const connection = await client.connect();
      const sqls = 'DELETE FROM orders WHERE id=($1)';

      const result = await connection.query(sqls, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cann't Delete Order id: ${id}, ${error}`);
    }
  }
}

