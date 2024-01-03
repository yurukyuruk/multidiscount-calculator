const { template } = {
    template: `
      <style>  
      div{
        position: relative;
      }
      label {
        position: absolute;
        top: -10px;
        left: 15px;
        z-index: 1;
        background-color: white;
        padding-left: 5px;
        padding-right: 5px;
        color: black;
        font-size: 14px;
      }
      input {
        width: 40vw;
        height: 30px;
        border-radius: 5px;
        border: 1px solid rgb(116, 116, 116);
      }
      @media (min-width: 992px) {
        input {
            width: 15vw;
        }
      }
      </style>
      <div>
        <label></label>
        <input type="text">
      </div>
      `
  };
  
  export class TextInput extends HTMLElement {
    static TAG = "text-input";
  
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;
      this.getElementsReferences();
    }
    setInput(name, id, text) {
      this.div.className = name;
      this.label.htmlFor = id; 
      this.label.textContent = text;
      this.input.id = id;
      this.input.name = id;
    }
    get value() {
      return this.input.value;
    }
    getElementsReferences() {
     this.div = this.shadowRoot.querySelector("div");
     this.label = this.shadowRoot.querySelector("label");
     this.input = this.shadowRoot.querySelector("input");
    }
    
  }
  customElements.define(TextInput.TAG, TextInput);