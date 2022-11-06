import { Product } from '../product.model';

const products = new Product();

describe('Product Model', () => {
  it('Should have a index method', () => {
    expect(products.index).toBeDefined();
  });
  it('Should have a show method', () => {
    expect(products.show).toBeDefined();
  });
  it('Should have a create method', () => {
    expect(products.create).toBeDefined();
  });
  it('Should have a update method', () => {
    expect(products.update).toBeDefined();
  });
  it('Should have a delete method', () => {
    expect(products.delete).toBeDefined();
  });

  it('Create Product', async () => {
    const resultCreate = await products.create({
      id: 1,
      name: 'test',
      price: 102,
    });
    expect(resultCreate).toEqual({
      id: 1,
      name: 'test',
      price: 102,
    });
  });
  it('Get All Products', async () => {
    const result = await products.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'test',
        price: 102,
      },
    ]);
  });
  it('Get One Product', async () => {
    const result = await products.show(1);
    expect(result).toEqual({
      id: 1,
      name: 'test',
      price: 102,
    });
  });
  it('Update Product', async () => {
    const result = await products.update({
      id: 1,
      name: 'test20000',
      price: 200,
    });
    expect(result).toEqual({
      id: 1,
      name: 'test20000',
      price: 200,
    });
  });
  // it('Delete Product', async () => {
  //   products.delete('1');
  //   const result = await products.index();
  //   expect(result).toEqual([]);
  // });
});
