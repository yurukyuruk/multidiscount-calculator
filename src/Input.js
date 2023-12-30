const { template } = {
    template: `
      <style>  
      .item-count-input-area, .discount-input-area , .product-name-input-area, .price-input-area{
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
      #item-count, #discount, #product-name, #price {
        width: 40vw;
        height: 30px;
        border-radius: 5px;
        border: 1px solid rgb(116, 116, 116);
      }
      @media (min-width: 992px) {
        #item-count, #discount, #product-name, #price {
            width: 15vw;
        }
      }
      </style>
      <div>
        <label></label>
        <input>
      </div>
      `
  };
  
  export class Input extends HTMLElement {
    static TAG = "element-input";
  
    constructor(divClassname, inputId, labelText) {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;
      this.getElementsReferences();
      this.div.className = divClassname;
      this.label.htmlFor = inputId;
      this.label.textContent = labelText;
      this.input.type = "text";
      this.input.id = inputId;
      this.input.name = inputId;
      this.initilizeListeners();
    }
    initilizeListeners() {
    }
    getElementsReferences() {
     this.div = this.shadowRoot.querySelector("div");
     this.label = this.shadowRoot.querySelector("label");
     this.input = this.shadowRoot.querySelector("input");
    }
    
  }
  customElements.define(Input.TAG, Input);