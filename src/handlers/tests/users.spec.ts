import supertest from 'supertest';
import app from '../../server';

let token: unknown
let user_id: number | undefined;

// test endpoints
const request = supertest(app);
describe('Test Users endpoints api', () => {
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
  it('Endpoint get all Users', async () => {
    const response = await request
      .get('/users/')
      .set('Content-type', `application/json`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200);
  });
  it('Endpoint Create User', async () => {
    const response = await request
      .post('/users/')
      .set('Content-type', `application/json`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        first_name: "firstname",
        last_name: "lastname",
        password: "120"
      })
    expect(response.status).toBe(200);
  });
  it('Endpoint get One User', async () => {
    const response = await request
      .get('/users/1')
      .set('Content-type', `application/json`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200);
  });
  it('Endpoint Upddate User', async () => {
    const response = await request
      .put('/users/66')
      .set('Content-type', `application/json`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200);
  });
  it('Endpoint delete User', async () => {
    const response = await request
      .delete('/users/1')
      .set('Content-type', `application/json`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200);
  });
});
