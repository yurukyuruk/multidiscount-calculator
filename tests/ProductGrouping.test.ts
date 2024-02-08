import { ProductGroup } from '../src/ProductGroup';

describe(ProductGroup.name, () => {
  const validator = new ProductGroup();

  test('check if returns expected object 1', () => {
    const array1 = [
      {
        itemCount: '2',
        discount: '10',
      },
      {
        itemCount: '4',
        discount: '20',
      },
      {
        itemCount: '3',
        discount: '15',
      },
    ];
    const array2 = [
      {
        productName: 'a',
        price: '1000',
      },
      {
        productName: 'b',
        price: '1000',
      },
      {
        productName: 'c',
        price: '1000',
      },
      {
        productName: 'd',
        price: '100',
      },
      {
        productName: 'e',
        price: '1',
      },
    ];
    expect(validator.useInputData(array1, array2)).toEqual([
      { productNames: ['a', 'b', 'c'], itemCount: 3, discountRatio: 15, discountAmount: 150 },
      { productNames: ['d', 'e'], itemCount: 2, discountRatio: 10, discountAmount: 0.1 },
    ]);
  });

  test('check if returns expected object 1', () => {
    const array1 = [
      {
        itemCount: '2',
        discount: '10',
      },
      {
        itemCount: '3',
        discount: '15',
      },
    ];
    const array2 = [
      {
        productName: 'a',
        price: '1000',
      },
      {
        productName: 'b',
        price: '1000',
      },
      {
        productName: 'c',
        price: '1000',
      },
      {
        productName: 'd',
        price: '1',
      },
    ];
    expect(validator.useInputData(array1, array2)).toEqual([
      { productNames: ['a', 'b', 'c'], itemCount: 3, discountRatio: 15, discountAmount: 150 },
    ]);
  });
});
