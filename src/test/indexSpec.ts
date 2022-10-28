import supertest from 'supertest';
import app from '../index';

const Request = supertest(app);

describe('Test basic endpoint server', () => {
  it('Get The endpoint', async () => {
    const Response = await Request.get('/');
    expect(Response.status).toBe(200);
  });
});
