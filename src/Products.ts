import { ProductInputsWrapper } from './ProductInputsWrapper';
import { Button } from './Button';

const { template } = {
  template: `
    <style>  
    summary {
        color:rgb(28, 28, 28);
        font-size: 20px;
        width: 90vw;
        padding-top: 20px;
        padding-bottom: 20px;
        cursor: pointer;
    }
    ul {
      margin: 0;
      padding: 0;
    }
    .buttons-wrapper {
      display: flex;
      justify-content: space-between;
    }
    @media (min-width: 992px) {
        .product-section form details summary {
            width: 34vw;
        }
    }
  </style>
    <section class="product-section">
        <form action="" method="post">
            <details>
                <summary>Products</summary>
                <ul class = "inputs-wrapper-list">
                  <product-inputs-wrapper></product-inputs-wrapper>
                </ul>
                <div class="buttons-wrapper">
                  <element-button class="add-button"></element-button>
                  <element-button class="clear-button"></element-button>
                </div>
            </details>
        </form>
    </section>
    `,
};

export class Products extends HTMLElement {
  static TAG = 'products-element';
  static PRODUCTS_INPUT_INFORMATION: [string, string, string, string, string, string] = [
    'product-name-input-area',
    'product-name',
    'Product name',
    'price-input-area',
    'price',
    'Price',
  ];
  shadowRoot!: ShadowRoot;
  inputsWrapperList!: HTMLUListElement;
  productInputsWrapper!: ProductInputsWrapper;
  productInputsWrappers!: ProductInputsWrapper[];
  buttonsWrapper!: HTMLDivElement;
  addButton!: Button;
  clearButton!: Button;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
    this.initializeListeners();
    this.productInputsWrapper.setInputs(...Products.PRODUCTS_INPUT_INFORMATION);
    this.setAddButton();
    this.setClearButton();
    this.setEventListenerToDeleteButtonOfFirstInput();
  }
  setEventListenerToDeleteButtonOfFirstInput() {
    this.productInputsWrapper.addEventListenerToDeleteButton(() => {
      this.productInputsWrapper.remove();
    });
  }
  addNewInputs() {
    const newInputsWrapper = new ProductInputsWrapper();
    newInputsWrapper.setInputs(...Products.PRODUCTS_INPUT_INFORMATION);
    newInputsWrapper.addEventListenerToDeleteButton(() => {
      newInputsWrapper.remove();
    });
    this.inputsWrapperList.append(newInputsWrapper);
  }
  setAddButton() {
    this.addButton.className = 'add-button';
    this.addButton.textContent = '+ Add';
  }
  setClearButton() {
    this.clearButton.className = 'clear-button';
    this.clearButton.textContent = 'Clear';
  }
  getProductInputValues() {
    const productInputValues: { productName: string; price: string }[] = [];
    const inputsWrappers = this.shadowRoot.querySelectorAll<ProductInputsWrapper>('product-inputs-wrapper');
    inputsWrappers.forEach((wrapper) => {
      productInputValues.push(wrapper.getInputValues());
    });
    return productInputValues;
  }
  checkIfAnyInputInDiscountDefinitionIsEmpty() {
    this.productInputsWrappers = [...this.shadowRoot.querySelectorAll<ProductInputsWrapper>('product-inputs-wrapper')];
    return this.productInputsWrappers.some(
      (productInputsWrapper) => productInputsWrapper.checkIfAnyInputIsEmpty() === true
    );
  }
  displayErrorMessagesIfAnyInputIsEmptyInDiscountDefinition() {
    this.productInputsWrappers = [...this.shadowRoot.querySelectorAll<ProductInputsWrapper>('product-inputs-wrapper')];
    this.productInputsWrappers.forEach((productInputsWrapper) => {
      productInputsWrapper.displayErrorMessagesIfAnyInputIsEmpty();
    });
  }
  initializeListeners() {
    this.addButton.addEventListener('click', () => {
      this.addNewInputs();
    });
    this.clearButton.addEventListener('click', () => {
      this.inputsWrapperList.innerHTML = '';
      this.addNewInputs();
    });
  }
  getElementsReferences() {
    this.inputsWrapperList = this.shadowRoot.querySelector('.inputs-wrapper-list') as HTMLUListElement;
    this.productInputsWrapper = this.shadowRoot.querySelector('product-inputs-wrapper') as ProductInputsWrapper;
    this.buttonsWrapper = this.shadowRoot.querySelector('.buttons-wrapper') as HTMLDivElement;
    this.addButton = this.shadowRoot.querySelector('.add-button') as Button;
    this.clearButton = this.shadowRoot.querySelector('.clear-button') as Button;
  }
}
customElements.define(Products.TAG, Products);
