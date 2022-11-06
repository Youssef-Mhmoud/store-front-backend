import { Product } from '../product.model';

const products = new Product();
let pro_id: number | undefined;
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
      id: 50,
      name: 'test00',
      price: 1023,
    });
    pro_id = resultCreate.id
    expect(resultCreate).toEqual({
      id: pro_id,
      name: 'test00',
      price: 1023,
    });
  });
  it('Get All Products', async () => {
    const result = await products.index();
    expect(result.length).toEqual(4);
  });
  it('Get One Product', async () => {
    const result = await products.show(pro_id as number);
    expect(result).toEqual({
      id: pro_id,
      name: 'test00',
      price: 1023,
    });
  });
  it('Update Product', async () => {
    const result = await products.update({
      id: pro_id,
      name: 'test20000',
      price: 200,
    });
    expect(result).toEqual({
      id: pro_id,
      name: 'test20000',
      price: 200,
    });
  });
  // let result: unknown;
  // afterAll(async () => {
  //   products.delete(pro_id?.toString() as string);
  //   result = await products.index();
  // });
  // it('Delete Product', async () => {
  //   expect(result).toEqual([]);
  // });
});




