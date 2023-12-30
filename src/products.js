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
    .inputs-wrapper {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
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
                <div class="inputs-wrapper">                            
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
    this.initilizeListeners();
    this.addInputs();
    this.addButton();
  }
  initilizeListeners() {
  }
  addInputs() {
    const productNameInput = new Input("product-name-input-area", "product-name", "Product name");
    this.inputsWrapper.append(productNameInput);
    const priceInput = new Input("price-input-area", "price", "Price");
    this.inputsWrapper.append(priceInput);
  }
  addButton() {
    const button = new Button("+ Add", "add-button");
    this.details.append(button);
  }
  getElementsReferences() {
    this.inputsWrapper = this.shadowRoot.querySelector(".inputs-wrapper");
    this.details = this.shadowRoot.querySelector("details");
  } 
}
customElements.define(Products.TAG, Products);