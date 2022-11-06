import { Order } from '../order.model';

const orders = new Order();

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

  it('Create Order', async () => {
    const resultCreate = await orders.create({
      id: 1,
      status: 'active',
      user_id: 1,
    });
    expect(resultCreate).toEqual({
      id: 1,
      status: 'active',
      user_id: 1,
    });
  });
  it('Get All Orders', async () => {
    const result = await orders.index();
    expect(result).toEqual([
      {
        id: 1,
        status: 'active',
        user_id: 1,
      },
    ]);
  });
  it('Get One Order', async () => {
    const result = await orders.show(1);
    expect(result).toEqual({
      id: 1,
      status: 'active',
      user_id: 1,
    });
  });
  it('Update Order', async () => {
    const result = await orders.update({
      id: 2,
      status: 'not active',
      user_id: 2,
    });
    expect(result).toEqual({
      id: 1,
      status: 'not active',
      user_id: 2,
    });
  });
  // it('Delete Order', async () => {
  //   orders.delete('1');
  //   const result = await orders.index();
  //   expect(result).toEqual([]);
  // });
});
