import supertest from 'supertest';
import app from '../../server';

let token: unknown;

// test endpoints
const request = supertest(app);
describe('Test Products endpoints api', () => {
  it('Endpoint authenticate get token', async () => {
    const response = await request
      .post('/users/authenticate')
      .set('Content-type', `application/json`)
      .send({
        id: 1,
        password: '2000',
      });
    token = response.body;
    expect(response.status).toBe(200);
  });
  it('Endpoint get all products', async () => {
    const response = await request
      .get('/products/')
      .set('Content-type', `application/json`);
    expect(response.status).toBe(200);
  });
  it('Endpoint Create Product', async () => {
    const response = await request
      .post('/products/')
      .set('Content-type', `application/json`)
      .set(
        'Authorization',
        `Bearer ${token}`)
      .send({
        id: 66,
        name: 'test',
        price: 120,
      });
    expect(response.status).toBe(200);
  });
  it('Endpoint get One Product', async () => {
    const response = await request
      .get('/products/1')
      .set('Content-type', `application/json`);
      // .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('Endpoint Update Product', async () => {
    const response = await request
      .put('/products/1')
      .set(
        'Authorization',
        `Bearer ${token}`)
      .set('Content-type', `application/json`);
    expect(response.status).toBe(200);
  });
  it('Endpoint Delete Product', async () => {
    const response = await request
      .delete('/products/66')
      .set(
        'Authorization',
        `Bearer ${token}`)
      .set('Content-type', `application/json`);
    expect(response.status).toBe(200);
  });
});
