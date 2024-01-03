import { Button } from "./Button.js";
import { ProductsAndSavingsListItem } from "./ProductsAndSavingsListItem.js";


const { template } = {
  template: `
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
        <element-button></element-button>
    </div>
    <ul class="products-and-savings-list">
      <products-and-savings-list-item></products-and-savings-list-item>
      <products-and-savings-list-item></products-and-savings-list-item>
    </ul>
    `
};

export class Summary extends HTMLElement {
  static TAG = "element-summary";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
    this.initilizeListeners();
    this.setGenerateButton();
  }
  initilizeListeners() {

  }
  setGenerateButton() {
    this.generateButton.className = "generate-button";
    this.generateButton.textContent = "Generate";
  }
  getElementsReferences() {
    this.generateButton = this.shadowRoot.querySelector("element-button");
  }
  
}
customElements.define(Summary.TAG, Summary);