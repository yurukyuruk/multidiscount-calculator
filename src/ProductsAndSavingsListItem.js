const { template } = {
  template: `
      <style>  
      .grouped-product {
        display: flex;
        justify-content: space-between;
        background-color: rgb(248, 242, 251);
        border-radius: 10px;
        padding: 10px;
        margin-top: 20px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      }
      .products-list-part {
            border-right: 1px solid rgb(28, 28, 28);
            width: 45vw;
            padding: 10px;
      }
      .savings-part {
            align-self: center;
            width: 45vw;
            padding: 10px;
      }
      .products-list-part h2, .savings-part h2 {
        margin: 0;
      }
      .products-list-part h2 {
        color:rgb(28, 28, 28);
        font-size: 20px;
        font-weight: 200;
      }
      .products-list-part ul {
        margin-left: 32px;
        padding-top: 20px;
      }  
      .savings-part h2 {
        color:rgb(28, 28, 28);
        font-size: 20px;
        align-self: center;
        padding-left: 20px;
      }
      @media (min-width: 992px) {
        .products-list-part {
            width: 20vw;
        }
        .savings-part {
            width: 20vw;
        }
      }
      </style>
      <li class="grouped-product">
            <div class="products-list-part">
                <h2 class="products-summary"></h2>
                <ul>
                </ul>
            </div>
            <div class="savings-part">
                <h2 class="savings"></h2>
            </div>
      </li>
      `,
};

export class ProductsAndSavingsListItem extends HTMLElement {
  static TAG = 'products-and-savings-list-item';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
  }
  setProductListSummaryHeader(numberOfProducts, discountRatio) {
    this.productListSummaryHeader.innerHTML = `${numberOfProducts} Products, ${discountRatio}% Discount`;
  }
  createGroupedProductAndSetText(textArray) {
    textArray.forEach((text) => {
      const eachGroupedProduct = document.createElement('li');
      text = text[0].toUpperCase() + text.slice(1).toLowerCase();
      eachGroupedProduct.innerHTML = text;
      this.groupedPreductList.append(eachGroupedProduct);
    });
  }
  setSavingsText(text) {
    this.savings.innerHTML = `SAVINGS: ${text}`;
  }
  getElementsReferences() {
    this.groupedPreductList = this.shadowRoot.querySelector('ul');
    this.savings = this.shadowRoot.querySelector('.savings');
    this.productListSummaryHeader = this.shadowRoot.querySelector('.products-summary');
  }
}
customElements.define(ProductsAndSavingsListItem.TAG, ProductsAndSavingsListItem);
