import { InputsWrapper } from "./InputsWrapper.js";
import { Input } from "./Input.js";
import {Button} from "./Button.js";
const { template } = {
  template: `
    <style>  
    section {
        border-bottom: 1px solid  rgb(116, 116, 116);
    }
    details {
      display: flex;
      flex-direction: column;
    }
    summary {
        color:rgb(28, 28, 28);
        font-size: 20px;
        width: 90vw;
        padding-top: 20px;
        padding-bottom: 30px;
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
        .discount-definition-section form details summary {
            width: 34vw;
        }
    }
  </style>
    <section class="discount-definition-section">
        <form action="" method="post">
            <details>
                <summary>Discount Definition</summary>
                <ul class = "inputs-wrappers">
                  <inputs-wrapper></inputs-wrapper>
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

export class DiscountDefinition extends HTMLElement {
  static TAG = "discount-definition";
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
    this.discountInputInformation = ["item-count-input-area", "item-count", "Item count", "discount-input-area", "discount", "Discount"];
    this.inputsWrapper.setInputs(...this.discountInputInformation);
    this.setAddButton();
    this.setClearButton();
  }
  addNewInputs() {
      const newInputsWrapper = new InputsWrapper();
      newInputsWrapper.setInputs(...this.discountInputInformation); 
      this.inputsWrappers.append(newInputsWrapper);
  }
  setAddButton() {
    this.addButton.className = "add-button";
    this.addButton.textContent = "+ Add";
    this.addButton.addEventListener("click", () => {
      this.addNewInputs(); 
    })
  }
  setClearButton() {
    this.clearButton.className = "clear-button";
    this.clearButton.textContent = "Clear";
    this.clearButton.addEventListener("click", () => {
      this.inputsWrappers.innerHTML = "";
      this.addNewInputs();
    })
  }
  getElementsReferences() {
    this.inputsWrappers = this.shadowRoot.querySelector(".inputs-wrappers");
    this.inputsWrapper = this.shadowRoot.querySelector("inputs-wrapper");
    this.buttonsWrapper = this.shadowRoot.querySelector(".buttons-wrapper");
    this.addButton = this.shadowRoot.querySelector(".add-button");
    this.clearButton = this.shadowRoot.querySelector(".clear-button");
  } 
}
customElements.define(DiscountDefinition.TAG, DiscountDefinition);