import { Users } from '../user.model';

const users = new Users();

describe('Users Model', () => {
  it('Should have a index method', () => {
    expect(users.index).toBeDefined();
  });
  it('Should have a show method', () => {
    expect(users.show).toBeDefined();
  });
  it('Should have a create method', () => {
    expect(users.create).toBeDefined();
  });
  it('Should have a update method', () => {
    expect(users.update).toBeDefined();
  });
  it('Should have a delete method', () => {
    expect(users.delete).toBeDefined();
  });
  it('Should have a authenticate method', () => {
    expect(users.authenticate).toBeDefined();
  });

  it('Create User', async () => {
    const resultCreate = await users.create({
      first_name: 'test',
      last_name: 'test200',
      password: '123',
    });
    expect(resultCreate).toEqual({
      id: 1,
      first_name: 'test',
      last_name: 'test200',
      password: resultCreate.password,
    });
  });

  it('Get All Users', async () => {
    const result = await users.index();
    expect(result).toEqual([
      {
        id: 1,
        first_name: 'test',
        last_name: 'test200',
      },
    ]);
  });
  it('Get One User', async () => {
    const result = await users.show(1);
    expect(result).toEqual({
      id: 1,
      first_name: 'test',
      last_name: 'test200',
    });
  });
  it('Update User', async () => {
    const result = await users.update({
      id: 1,
      first_name: 'not',
      last_name: 'test',
      password: '123',
    });
    expect(result).toEqual({
      id: 1,
      first_name: 'not',
      last_name: 'test',
    });
  });
  it('Delete User', async () => {
    users.delete('1');
    const result = await users.index();
    expect(result).toEqual([]);
  });
});
