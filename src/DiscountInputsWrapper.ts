import { NumberInput } from './NumberInput';
import { Button } from './Button';
import { deleteButtonCallbackFunction } from './types/typesAndInterfaces';

const template =
  /*html*/
  ` <style>  
    .inputs-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: start;
        padding-top: 10px;
    }
    .delete-button {
      margin-right: 5px;
    }
    .first-input {
      margin-right: 5px;
    }
    </style>
    <li class="inputs-wrapper">
        <${Button.TAG} class="delete-button"></${Button.TAG}>
        <${NumberInput.TAG} class="first-input"></${NumberInput.TAG}>
        <${NumberInput.TAG} class="second-input"></${NumberInput.TAG}>
    </li>
    `;

export class DiscountInputsWrapper extends HTMLElement {
  static TAG = 'discount-inputs-wrapper';
  shadowRoot: ShadowRoot;
  deleteButton!: Button;
  firstInput!: NumberInput;
  secondInput!: NumberInput;
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
    this.deleteButton.textContent = '-';
    this.deleteButton.className = 'delete-button';
    this.addErrorMessagesForEmptyInputs();
  }
  addEventListenerToDeleteButton(callback: deleteButtonCallbackFunction) {
    this.deleteButton.addEventListener('click', callback);
  }
  setInputs(name1: string, id1: string, text1: string, name2: string, id2: string, text2: string) {
    this.firstInput.setInput(name1, id1, text1);
    this.secondInput.setInput(name2, id2, text2);
  }
  getInputValues() {
    return { itemCount: this.firstInput.value, discount: this.secondInput.value };
  }
  addErrorMessagesForEmptyInputs() {
    this.firstInput.createErrorMessageForEmptyInput('Item count');
    this.secondInput.createErrorMessageForEmptyInput('Discount');
  }
  checkIfAnyInputIsEmpty() {
    if (this.firstInput.checkIfInputIsEmpty() === true || this.secondInput.checkIfInputIsEmpty() === true) {
      return true;
    } else {
      return false;
    }
  }
  displayErrorMessagesIfAnyInputIsEmpty() {
    this.firstInput.displayErrorMessageIfInputIsEmpty();
    this.secondInput.displayErrorMessageIfInputIsEmpty();
  }
  getElementsReferences() {
    this.deleteButton = this.shadowRoot.querySelector('.delete-button') as Button;
    this.firstInput = this.shadowRoot.querySelector('.first-input') as NumberInput;
    this.secondInput = this.shadowRoot.querySelector('.second-input') as NumberInput;
  }
}
customElements.define(DiscountInputsWrapper.TAG, DiscountInputsWrapper);
