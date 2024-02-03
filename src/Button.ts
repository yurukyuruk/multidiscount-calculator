const template = /*html*/ `
      <style>  
      .copy-button {
        background-color: white;
        color: rgb(104,81,166);
        border: 2px solid rgb(104,81,166);
        border-radius: 15px;
        margin-right: 5px;
        height: 30px;
        width: 120px;
        cursor: pointer;
      }
      .whatsapp-button {
        background-color: white;
        color: rgb(104,81,166);
        border: 2px solid rgb(104,81,166);
        border-radius: 15px;
        margin-right: 5px;
        height: 30px;
        width: 120px;
        cursor: pointer;
      }
      .email-button {
        background-color: white;
        color: rgb(104,81,166);
        border: 2px solid rgb(104,81,166);
        border-radius: 15px;
        height: 30px;
        width: 120px;
        cursor: pointer;
      }
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
    .fab-button {
      background: rgb(248, 242, 251) url("../images/whatsapp.png") center center / 30px 30px no-repeat;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
      border: 2px solid rgb(104,81,166);
      width: 60px;
      height: 60px;
      border-radius: 15px;
      position: fixed;
      right: 10px;
      bottom: 40px;
      cursor: pointer;
    }
      </style>
      <button type="button"></button>
      `;

export class Button extends HTMLElement {
  static TAG = 'element-button';
  shadowRoot: ShadowRoot;
  button!: HTMLButtonElement;
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
  }
  set className(name: string) {
    this.button.className = name;
  }
  set textContent(text: string) {
    this.button.textContent = text;
  }
  getElementsReferences() {
    this.button = this.shadowRoot.querySelector('button') as HTMLButtonElement;
  }
}
customElements.define(Button.TAG, Button);
