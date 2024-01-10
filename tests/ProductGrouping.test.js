import {ProductGrouping} from "../src/ProductGrouping.js";

describe("ProductGrouping", () => {
    const validator = new ProductGrouping();
  
    test("check if returns expected object 1", () => {
        const array1 = [["2", "10"], ["4", "20"], ["3", "15"]];
        const array2 = [["a", "1000"], ["b", "1000"], ["c", "1000"], ["d", "100"], ["e", "1"]];
        expect(
            validator.useInputData(array1, array2)
        ).toEqual([{names: ['a', 'b', 'c'], propotionalDiscount: 150}, {names: ['d', 'e'], propotionalDiscount: 0.1}]);
    });

    test("check if returns expected object 2", () => {
        const array1 = [["2", "10"], ["3", "15"]];
        const array2 = [["a", "1000"], ["b", "1000"], ["c", "1000"], ["d", "1"]];
        expect(
            validator.useInputData(array1, array2)
        ).toEqual([{names: ['a', 'b', 'c'], propotionalDiscount: 150}]);
    });

    test("check if returns expected object 3", () => {
        const array1 = [["2", "10"], ["3", "15"], ["", ""]];
        const array2 = [["a", "1000"], ["b", "1000"], ["c", "1000"], ["d", "1"]];
        expect(
            validator.useInputData(array1, array2)
        ).toEqual([{names: ['a', 'b', 'c'], propotionalDiscount: 150}]);
    });
  });