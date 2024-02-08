const template = /*html*/ `
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
      `;

export class ProductsAndSavingsListItem extends HTMLElement {
  static TAG = 'products-and-savings-list-item';
  shadowRoot: ShadowRoot;
  groupedPreductList!: HTMLUListElement;
  savings!: HTMLHeadingElement;
  productListSummaryHeader!: HTMLHeadingElement;
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
  }
  getTextContentOfListItem() {
    let uLItems = ``;
    const groupedProductListItems = [...this.groupedPreductList.children];
    groupedProductListItems.forEach((groupedProduct) => {
      uLItems += `
      ∙${groupedProduct.textContent}`;
    });

    return `
    ${this.productListSummaryHeader.textContent} (${this.savings.textContent})
    ${uLItems}`;
  }
  setProductListSummaryHeader(numberOfProducts: number, discountRatio: number) {
    this.productListSummaryHeader.innerHTML = `${numberOfProducts} Products, ${discountRatio}% Discount`;
  }
  createGroupedProductAndSetText(textArray: string[]) {
    textArray.forEach((text) => {
      const eachGroupedProduct = document.createElement('li');
      const uppercaseText = text[0].toUpperCase() + text.slice(1).toLowerCase();
      eachGroupedProduct.innerHTML = uppercaseText;
      this.groupedPreductList.append(eachGroupedProduct);
    });
  }
  setSavingsText(text: number) {
    this.savings.innerHTML = `SAVINGS: ${text}`;
  }
  getElementsReferences() {
    this.groupedPreductList = this.shadowRoot.querySelector('ul') as HTMLUListElement;
    this.savings = this.shadowRoot.querySelector('.savings') as HTMLHeadingElement;
    this.productListSummaryHeader = this.shadowRoot.querySelector('.products-summary') as HTMLHeadingElement;
  }
}
customElements.define(ProductsAndSavingsListItem.TAG, ProductsAndSavingsListItem);
