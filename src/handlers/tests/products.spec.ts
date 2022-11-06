import supertest from 'supertest';
import app from '../../server';

const token: unknown =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpudWxsLCJpYXQiOjE2Njc3MjYxMjZ9.Hp9HgQ6dDVM-1dcnrMN2X9nmDqZEOnE7zL0XVja21ag';

// test endpoints
const request = supertest(app);
describe('Test Products endpoints api', () => {
  it('Endpoint get all products', async () => {
    const response = await request
      .get('/products/')
      .set('Content-type', `application/json`)
      .set(
        'Authorization',
        'Bearer ' + token
      )
    expect(response.status).toBe(200);
  });
});
