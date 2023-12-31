import { Button } from "./Button.js";
import { Input } from "./Input.js";
const { template } = {
  template: `
    <style>  
    .product-section form details summary {
        color:rgb(28, 28, 28);
        font-size: 20px;
        width: 90vw;
        padding-top: 20px;
        padding-bottom: 30px;
    }
    .discount-definition-section form details summary {
        padding-top: 20px;
        padding-bottom: 30px;
    }
    ul {
      padding-left: 0;
      margin: 0;
    }
    .inputs-wrapper {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
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
                <ul></ul>
                <div class="buttons-wrapper"></div>
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
    this.initilizeListeners();
    this.addInputs();
    this.addAddButton();
    this.addClearButton();
  }
  initilizeListeners() {
  }
  addInputs() {
    const inputsWrapper = document.createElement("div");
    inputsWrapper.className = "inputs-wrapper";
    this.inputsWrapperList.append(inputsWrapper);
    const productNameInput = new Input("product-name-input-area", "product-name", "Product name");
    inputsWrapper.append(productNameInput);
    const priceInput = new Input("price-input-area", "price", "Price");
    inputsWrapper.append(priceInput);
  }
  clearInputs() {
    this.inputsWrapperList.innerHTML = "";
    this.addInputs();
  }
  addAddButton() {
    const button = new Button("+ Add", "add-button");
    this.buttonsWrapper.append(button);
    button.button.addEventListener("click", () => {
      this.addInputs();
    })
  }
  addClearButton() {
    const button = new Button("Clear", "clear-button");
    this.buttonsWrapper.append(button);
    button.button.addEventListener("click", () => {
      this.clearInputs();
    })
  }
  getElementsReferences() {
    this.inputsWrapperList = this.shadowRoot.querySelector("ul");
    this.buttonsWrapper = this.shadowRoot.querySelector(".buttons-wrapper");
  } 
}
customElements.define(Products.TAG, Products);