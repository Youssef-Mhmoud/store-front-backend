import { Orders_Products } from '../../types/order_produts';
import { Order } from '../order.model';
import { Product } from '../product.model';
import { Users } from '../user.model';

const users = new Users();
const product = new Product();
const orders = new Order();

let user_id: number | undefined;
let order_id: number | undefined;
let product_id: number | undefined;

describe('Order Model', () => {
  it('Should have a index method', () => {
    expect(orders.index).toBeDefined();
  });
  it('Should have a show method', () => {
    expect(orders.show).toBeDefined();
  });
  it('Should have a create method', () => {
    expect(orders.create).toBeDefined();
  });
  it('Should have a update method', () => {
    expect(orders.update).toBeDefined();
  });
  it('Should have a delete method', () => {
    expect(orders.delete).toBeDefined();
  });

  beforeAll(async () => {
    const resultCreate = await users.create({
      first_name: 'test100',
      last_name: 'test500',
      password: '789',
    });
    user_id = resultCreate.id;
  });
  beforeAll(async () => {
    const resultCreate = await product.create({
      id: 1,
      name: 'test',
      price: 102,
    });
    product_id = resultCreate.id;
  });

  it('Create Order', async () => {
    const resultCreate = await orders.create({
      id: 1,
      status: 'active',
      user_id: user_id?.toString(),
    });
    order_id = resultCreate.id;
    expect(resultCreate).toEqual({
      id: 1,
      status: 'active',
      user_id: user_id?.toString(),
    });
  });

  it('Create Order_Product', async () => {
    const orderId: string = order_id?.toString() as string;
    const productId: string = product_id?.toString() as string;
    const quantity: number = 120 as number;

    const resultCreated: Orders_Products = await orders.createProduct({
      quantity: quantity,
      order_id: orderId,
      products_id: productId,
    });

    expect(resultCreated).toEqual({quantity: quantity, order_id: orderId, products_id: productId});
  });

  it('Get All Orders', async () => {
    const result = await orders.index();
    expect(result).toEqual([
      {
        id: 1,
        status: 'active',
        user_id: user_id?.toString(),
      },
    ]);
  });
  it('Get One Order', async () => {
    const result = await orders.show(1);
    expect(result).toEqual({
      id: 1,
      status: 'active',
      user_id: user_id?.toString(),
    });
  });
  it('Update Order', async () => {
    const result = await orders.update({
      id: 1,
      status: 'not active',
      user_id: user_id?.toString(),
    });
    expect(result).toEqual({
      id: 1,
      status: 'not active',
      user_id: user_id?.toString(),
    });
  });
  // let result: unknown;
  // afterAll(async () => {
  //   orders.delete(order_id?.toString() as string);
  //   result = await orders.index();
  // });
  // it('Delete Order', async () => {

  //   expect(result).toEqual([]);
  // });
});
