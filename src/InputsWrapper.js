import { Input } from "./Input.js";

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
        <element-input class="item-count-input"></element-input>
        <element-input class="discount-input"></element-input>
    </li>
    `
};

export class InputsWrapper extends HTMLElement {
  static TAG = "inputs-wrapper";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
  }
  setInputs(name1, id1, text1, name2, id2, text2) {
    this.itemCountInput.setInput(name1, id1, text1);
    this.discountInput.setInput(name2, id2, text2);
  }
  getElementsReferences() {
    this.inputsWrapper = this.shadowRoot.querySelectorAll(".inputs-wrapper");
    this.itemCountInput = this.shadowRoot.querySelector(".item-count-input");
    this.discountInput = this.shadowRoot.querySelector(".discount-input");
  }
  
}
customElements.define(InputsWrapper.TAG, InputsWrapper);