const { template } = {
  template: `
      <style>  
      .delete-button {
        background-color: white;
        color: rgb(104,81,166);
        border: 2px solid rgb(104,81,166);
        justify-content: center;
        width: 20px;
        height: 20px;
        margin-top: 5px;
        border-radius: 5px;  
        cursor: pointer;
      }
      .add-button {
        background-color: rgb(104,81,166);
        color: white;
        border: none;
        border-radius: 15px;
        height: 30px;
        width: 80px;
        margin-top: 10px;
        margin-bottom: 30px;
        cursor: pointer;
    }
    .clear-button {
      background-color: white;
      color: rgb(104,81,166);
      border: 2px solid rgb(104,81,166);
      border-radius: 15px;
      height: 30px;
      width: 80px;
      margin-top: 10px;
      margin-bottom: 30px;
      cursor: pointer;
    }
    .generate-button {
      background-color: rgb(104,81,166);
      color: white;
      border: none;
      border-radius: 20px;
      height: 35px;
      width: 120px;
      cursor: pointer;
    }
      </style>
      <button type="button"></button>
      `,
};

export class Button extends HTMLElement {
  static TAG = 'element-button';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
  }
  set className(name) {
    this.button.className = name;
  }
  set textContent(text) {
    this.button.textContent = text;
  }
  getElementsReferences() {
    this.button = this.shadowRoot.querySelector('button');
  }
}
customElements.define(Button.TAG, Button);
