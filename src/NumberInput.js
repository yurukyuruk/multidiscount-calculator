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
      p {
        visibility: hidden;
        margin:0;
        color: red;
        font-size: 14px;
      }
      @media (min-width: 992px) {
        input {
            width: 15vw;
        }
      }
      </style>
      <div>
        <label></label>
        <input type="number">
        <p></p>
      </div>
      `
  };
  
  export class NumberInput extends HTMLElement {
    static TAG = "number-input";
  
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;
      this.getElementsReferences();
      this.initializeListeners();
    }
    get value() {
      this.input.value = this.input.value.replace(/[^0-9.]/g, '')
      return this.input.value;
    }
    setInput(name, id, text) {
      this.div.className = name;
      this.label.htmlFor = id; 
      this.label.textContent = text;
      this.input.id = id;
      this.input.name = id;
    }
    checkIfInputIsEmpty() {
      if(this.input.value === "") {
        return true;
      }
    }
    displayErrorMessageIfInputIsEmpty() {
      if(this.input.value === "") {
        this.errorMesage.style.visibility = "visible";
        this.input.style.outline = "1px solid red";
      } else {
        this.errorMesage.style.visibility = "hidden";
        this.input.style.outline = "none";
      }
    }
    initializeListeners() {
      this.input.addEventListener("input", () => {
        if(this.input.value === "") {
          this.errorMesage.style.visibility = "visible";
          this.input.style.outline = "1px solid red";
        } else {
          this.errorMesage.style.visibility = "hidden";
          this.input.style.outline = "none";
        }
      })
    } 
    createErrorMessageForEmptyInput(field) {
      this.errorMesage.innerHTML = `${field} can not be empty.`;
    }
    getElementsReferences() {
     this.div = this.shadowRoot.querySelector("div");
     this.label = this.shadowRoot.querySelector("label");
     this.input = this.shadowRoot.querySelector("input");
     this.errorMesage = this.shadowRoot.querySelector("p");
    }
    
  }
  customElements.define(NumberInput.TAG, NumberInput);