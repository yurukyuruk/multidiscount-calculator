import { NumberInput } from './NumberInput.js';
import { Button } from './Button.js';

const { template } = {
  template: `
    <style>  
    .inputs-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: start;
        padding-top: 10px;
    }
    </style>
    <li class="inputs-wrapper">
        <element-button class="delete-button"></element-button>
        <number-input class="first-input"></number-input>
        <number-input class="second-input"></number-input>
    </li>
    `,
};

export class DiscountInputsWrapper extends HTMLElement {
  static TAG = 'discount-inputs-wrapper';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
    this.deleteButton.textContent = "-";
    this.deleteButton.className = "delete-button";
    this.addErrorMessagesForEmptyInputs();
  }
  addEventListenerToDeleteButton(callback) {
    this.deleteButton.addEventListener('click', callback);
  }
  setInputs(name1, id1, text1, name2, id2, text2) {
    this.firstInput.setInput(name1, id1, text1);
    this.secondInput.setInput(name2, id2, text2);
  }
  getInputValues() {
    return {itemCount: this.firstInput.value, discount: this.secondInput.value};
  }
  addErrorMessagesForEmptyInputs() {
    this.firstInput.createErrorMessageForEmptyInput("Item count");
    this.secondInput.createErrorMessageForEmptyInput("Discount");
  }
  checkIfAnyInputIsEmpty() {
    if(this.firstInput.checkIfInputIsEmpty() === true || this.secondInput.checkIfInputIsEmpty() === true) {
      return true;
    }
  }
  displayErrorMessagesIfAnyInputIsEmpty() {
    this.firstInput.displayErrorMessageIfInputIsEmpty();
    this.secondInput.displayErrorMessageIfInputIsEmpty();
  }
  getElementsReferences() {
    this.inputsWrapper = this.shadowRoot.querySelector('.discount-inputs-wrapper');
    this.firstInput = this.shadowRoot.querySelector('.first-input');
    this.deleteButton = this.shadowRoot.querySelector('.delete-button');
    this.secondInput = this.shadowRoot.querySelector('.second-input');
  }
}
customElements.define(DiscountInputsWrapper.TAG, DiscountInputsWrapper);
