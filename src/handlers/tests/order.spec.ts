import supertest from 'supertest';
import { Product } from '../../models/product.model';
import { Users } from '../../models/user.model';
import app from '../../server';
const users = new Users
const products = new Product

let user_id: number | undefined;
let pro_id: number | undefined;

let token: unknown;
// test endpoints
const request = supertest(app);

describe('Test Orders endpoints api', () => {
  it('', async () => {
    const result = await users.create({
      first_name: "test",
      last_name: "test",
      password: "120"
    })
    user_id = result.id
  })
  it('', async () => {
    const result = await products.create({
      id: 56,
      name: "test20001",
      price: 520
    })
    pro_id = result.id
  })
  it('Endpoint authenticate get token', async () => {
    const response = await request
      .post('/users/authenticate')
      .set('Content-type', `application/json`)
      .send({
        id: 2,
        password: '200',
      });
    token = response.body;
    expect(response.status).toBe(200);
  });
  it('Endpoint get all Orders', async () => {
    const response = await request
      .get('/orders/')
      .set('Content-type', `application/json`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('Endpoint Create Order', async () => {
    const response = await request
      .post('/orders/')
      .set('Content-type', `application/json`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 98,
        status: 'active',
        user_id: user_id?.toString(),
      });
    expect(response.status).toBe(200);
  });
  it('Endpoint get One Order', async () => {
    const response = await request
      .get('/orders/1')
      .set('Content-type', `application/json`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('Endpoint Update Orders', async () => {
    const response = await request
      .put('/orders/1')
      .set('Content-type', `application/json`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('Endpoint Delete Orders', async () => {
    const response = await request
      .delete('/orders/1')
      .set('Content-type', `application/json`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('Endpoint Current Order by user', async () => {
    const response = await request
      .post('/orders/98/products')
      .set('Content-type', `application/json`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        quantity: 400,
        products_id: pro_id?.toString(),
      });
    expect(response.status).toBe(200);
  });
});
