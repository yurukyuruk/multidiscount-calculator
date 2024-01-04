import { ProductInputsWrapper } from "./ProductInputsWrapper.js";
import {Button} from "./Button.js";

const { template } = {
  template: `
    <style>  
    summary {
        color:rgb(28, 28, 28);
        font-size: 20px;
        width: 90vw;
        padding-top: 20px;
        padding-bottom: 30px;
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
    `
};

export class Products extends HTMLElement {
  static TAG = "products-element";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
    this.productsInputInformation = ["product-name-input-area", "product-name", "Product name", "price-input-area", "price", "Price"];
    this.productInputsWrapper.setInputs(...this.productsInputInformation);
    this.setAddButton();
    this.setClearButton();
    this.initializeListeners();
  }
  addNewInputs() {
    const newInputsWrapper = new ProductInputsWrapper();
    newInputsWrapper.setInputs(...this.productsInputInformation); 
    this.inputsWrapperList.append(newInputsWrapper);
  }
  setAddButton() {
    this.addButton.className = "add-button";
    this.addButton.textContent = "+ Add";
  }
  setClearButton() {
    this.clearButton.className = "clear-button";
    this.clearButton.textContent = "Clear";
  }
  getProductInputValues() {
    const productInputValues = [];
    const inputsWrappers = this.shadowRoot.querySelectorAll("product-inputs-wrapper");
    inputsWrappers.forEach((wrapper) => {
      productInputValues.push(wrapper.getInputValues());
    })
    return productInputValues;
  }
  initializeListeners() {
    this.addButton.addEventListener("click", () => {
      this.addNewInputs(); 
    })
    this.clearButton.addEventListener("click", () => {
      this.inputsWrapperList.innerHTML = "";
      this.addNewInputs();
    })
  }
  getElementsReferences() {
    this.inputsWrapperList = this.shadowRoot.querySelector(".inputs-wrapper-list");
    this.productInputsWrapper = this.shadowRoot.querySelector("product-inputs-wrapper");
    this.buttonsWrapper = this.shadowRoot.querySelector(".buttons-wrapper");
    this.addButton = this.shadowRoot.querySelector(".add-button");
    this.clearButton = this.shadowRoot.querySelector(".clear-button");
  } 
}
customElements.define(Products.TAG, Products);