import { Button } from "./Button.js";
//import { ListGenerator } from "./ListGenerator.js";
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
    .grouped-products-list {
        margin-bottom: 30px;
        padding-left: 0;
    }
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
    }.products-list-part ul {
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
        .summary-header-and-generate-button {
            width: 45vw;
        }
        .products-list-part {
            width: 20vw;
        }
        .savings-part {
            width: 20vw;
        }
    }
  </style>
    <div class="summary-header-and-generate-button">
        <h2>Summary</h2>
        <element-button></element-button>
    </div>
    <ul class="grouped-products-list">
        <li class="grouped-product">
            <div class="products-list-part">
                <h2>2 Products, 35% Discount</h2>
                <ul>
                    <li>Fridge</li>
                    <li>Oven</li>
                </ul>
            </div>
            <div class="savings-part">
                <h2>SAVINGS: 1750</h2>
            </div>
        </li>
        <li class="grouped-product">
            <div class="products-list-part">
                <h2>2 Products, 35% Discount</h2>
                <ul>
                    <li>Fridge</li>
                    <li>Oven</li>
                </ul>
            </div>
            <div class="savings-part">
                <h2>SAVINGS: 1750</h2>
            </div>
        </li>
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