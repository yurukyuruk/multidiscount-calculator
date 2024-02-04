import { Button } from './Button';
import { ProductsAndSavingsListItem } from './ProductsAndSavingsListItem';

const template = /*html*/ `
    <style>  
    .summary-header-and-generate-button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90vw;
    }
    .summary-header-and-generate-button h2 {
        font-weight: 200;
        font-size: 20px;
    }
    .products-and-savings-list {
      margin-bottom: 30px;
      padding-left: 0;
    }
    @media (min-width: 992px) {
        .summary-header-and-generate-button {
            width: 45vw;
        }
    }
  </style>
    <div class="summary-header-and-generate-button">
        <h2>Summary</h2>
        <${Button.TAG}></${Button.TAG}>
    </div>
    <ul class="products-and-savings-list">
    </ul>
    `;
export class Summary extends HTMLElement {
  static TAG = 'element-summary';
  shadowRoot: ShadowRoot;
  generateButton!: Button;
  productsAndSavingList!: HTMLUListElement;
  textContentOfListItems!: [];
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
    this.initializeListeners();
    this.setGenerateButton();
    this.textContentOfListItems = [];
  }
  initializeListeners() {
    this.generateButton.addEventListener('click', () => {
      const generateSummaryIfInputsAreFilled = new CustomEvent('generate-summary-if-inputs-are-filled', {
        bubbles: true,
        composed: true,
      });
      this.shadowRoot.dispatchEvent(generateSummaryIfInputsAreFilled);
    });
  }
  setGenerateButton() {
    this.generateButton.className = 'generate-button';
    this.generateButton.textContent = 'Generate';
  }
  clearProductsAndSavingListItems() {
    this.productsAndSavingList.innerHTML = '';
  }
  createProductsAndSavingsListItem(
    numberOfProducts: number,
    discountRatio: number,
    groupedProductText: string[],
    savingsText: number
  ) {
    const newProductsAndSavingsListItem = new ProductsAndSavingsListItem();
    newProductsAndSavingsListItem.setProductListSummaryHeader(numberOfProducts, discountRatio);
    newProductsAndSavingsListItem.createGroupedProductAndSetText(groupedProductText);
    newProductsAndSavingsListItem.setSavingsText(savingsText);
    this.productsAndSavingList.append(newProductsAndSavingsListItem);
    
    this.getTextContentOfGroupedProduct(newProductsAndSavingsListItem);
  }
  getTextContentOfGroupedProduct(newListItem: ProductsAndSavingsListItem) {
    this.textContentOfListItems.push(newListItem.getTextContentOfListItem());
  };
  getTextContentOfGroupedProducts() {
    return this.textContentOfListItems.join("\n");
  }
  getElementsReferences() {
    this.generateButton = this.shadowRoot.querySelector(Button.TAG) as Button;
    this.productsAndSavingList = this.shadowRoot.querySelector('.products-and-savings-list') as HTMLUListElement;
  }
}
customElements.define(Summary.TAG, Summary);
