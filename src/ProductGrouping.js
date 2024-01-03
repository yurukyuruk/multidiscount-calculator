 export class ProductGrouping extends HTMLElement {
    static TAG = "product-grouping";
    constructor() {
        super();
    }
    useInputData(inputValues) {
        console.log(inputValues);
    }
  }
  customElements.define(ProductGrouping.TAG, ProductGrouping);