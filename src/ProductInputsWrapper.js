import { NumberInput } from "./NumberInput.js";
import { TextInput } from "./TextInput.js";

const { template } = {
  template: `
    <style>  
    .inputs-wrapper {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
    }
    </style>
    <li class="inputs-wrapper">
        <text-input class="first-input"></text-input>
        <number-input class="second-input"></number-input>
    </li>
    `
};

export class ProductInputsWrapper extends HTMLElement {
  static TAG = "product-inputs-wrapper";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
  }
  setInputs(name1, id1, text1, name2, id2, text2) {
    this.firstInput.setInput(name1, id1, text1);
    this.secondInput.setInput(name2, id2, text2);
  }
  getInputValues() {
    return [this.firstInput.value, this.secondInput.value];
  }
  getElementsReferences() {
    this.discountInputsWrapper = this.shadowRoot.querySelector(".discount-inputs-wrapper");
    this.firstInput = this.shadowRoot.querySelector(".first-input");
    this.secondInput = this.shadowRoot.querySelector(".second-input");
  }
  
}
customElements.define(ProductInputsWrapper.TAG, ProductInputsWrapper);