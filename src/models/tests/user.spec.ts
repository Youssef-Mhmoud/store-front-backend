import { User } from '../../types/userType';
import { Users } from '../user.model';

const users = new Users();
let user_id: number | undefined;
let resultCreate: User;
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

  beforeAll(async () => {
    resultCreate = await users.create({
      first_name: 'test100',
      last_name: 'test500',
      password: '789',
    });
    user_id = resultCreate.id;
  });
  it('Create User', async () => {
    expect(resultCreate).toEqual({
      id: user_id,
      first_name: 'test100',
      last_name: 'test500',
      password: resultCreate.password,
    });
  });

  it('Get All Users', async () => {
    const result = await users.index();
    expect(result.length).toEqual(2);
  });
  it('Get One User', async () => {
    const result = await users.show(user_id as number);
    expect(result).toEqual({
      id: user_id,
      first_name: 'test100',
      last_name: 'test500',
    });
  });
  it('Update User', async () => {
    const result = await users.update({
      id: user_id,
      first_name: 'not',
      last_name: 'test',
      password: '123',
    });
    expect(result).toEqual({
      id: user_id,
      first_name: 'not',
      last_name: 'test',
    });
  });
  // let result: unknown;
  // afterAll(async () => {
  //   users.delete(user_id?.toString() as string);
  //   result = await users.index();
  //   console.log(result)
  // });
  // it('Delete User', async () => {
  //     console.log(result)
  //   expect(result).toEqual([]);
  // });
});
