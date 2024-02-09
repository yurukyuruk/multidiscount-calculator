import { NumberInput } from './NumberInput';
import { TextInput } from './TextInput';
import { Button } from './Button';
import { deleteButtonCallbackFunction } from './types/typesAndInterfaces';

const template = /*html*/ ` 
  <style>  
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
      <${TextInput.TAG} class="first-input"></${TextInput.TAG}>
      <${NumberInput.TAG} class="second-input"></${NumberInput.TAG}>
  </li>
    `;

export class ProductInputsWrapper extends HTMLElement {
  static TAG = 'product-inputs-wrapper';
  shadowRoot: ShadowRoot;
  deleteButton!: Button;
  firstInput!: TextInput;
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
    return { productName: this.firstInput.value, price: this.secondInput.value };
  }
  addErrorMessagesForEmptyInputs() {
    this.firstInput.createErrorMessageForEmptyInput('Product name');
    this.secondInput.createErrorMessageForEmptyInput('Price');
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
    this.firstInput = this.shadowRoot.querySelector('.first-input') as TextInput;
    this.secondInput = this.shadowRoot.querySelector('.second-input') as NumberInput;
  }
}
customElements.define(ProductInputsWrapper.TAG, ProductInputsWrapper);
