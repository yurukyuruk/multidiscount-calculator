const { template } = {
    template: `
      <style>  
      .add-button {
        background-color: rgb(104,81,166);
        color: white;
        border: none;
        border-radius: 15px;
        height: 25px;
        width: 60px;
        margin-top: 20px;
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
      `
  };
  
  export class Button extends HTMLElement {
    static TAG = "element-button";
  
    constructor(text, elementClassName) {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;
      this.initilizeListeners();
      this.getElementsReferences();
      this.button.type = "button";
      this.button.textContent = text;
      this.button.className = elementClassName;
    }
    initilizeListeners() {
    }
    getElementsReferences() {
     this.button = this.shadowRoot.querySelector("button");
    }
    
  }
  customElements.define(Button.TAG, Button);