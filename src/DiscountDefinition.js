import { Button } from "./Button.js";
import { Input } from "./Input.js";
const { template } = {
  template: `
    <style>  
    .discount-definition-section {
        border-bottom: 1px solid  rgb(116, 116, 116);
    }
    .discount-definition-section form details {
      display: flex;
      flex-direction: column;
    }
    .discount-definition-section form details summary {
        color:rgb(28, 28, 28);
        font-size: 20px;
        width: 90vw;
        padding-top: 20px;
        padding-bottom: 30px;
    }
    ul {
      padding-left: 0;
      margin: 0;
    }
    .inputs-wrapper {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
    }
    .buttons-wrapper {
      display: flex;
      justify-content: space-between;
    }
    @media (min-width: 992px) {
        .discount-definition-section form details summary {
            width: 34vw;
        }
    }
  </style>
    <section class="discount-definition-section">
        <form action="" method="post">
            <details>
                <summary>Discount Definition</summary>
                <ul></ul>
                <div class="buttons-wrapper">
                  <element-button></element-button>
                  <element-button></element-button>
                </div>
            </details>
        </form>
    </section>
    `
};

export class DiscountDefinition extends HTMLElement {
  static TAG = "discount-definition";
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
    this.addInputs();
    this.setAddButton();
    this.setClearButton();
  }
  addInputs() {
    const inputsWrapper = document.createElement("div");
    inputsWrapper.className = "inputs-wrapper";
    this.inputsWrapperList.append(inputsWrapper);
    const itemCountInput = new Input("item-count-input-area", "item-count", "Item count");
    inputsWrapper.append(itemCountInput);
    const discountInput = new Input("discount-input-area", "discount", "Discount");
    inputsWrapper.append(discountInput);
    
  }
  /*addInput = () => {
    const discountItemWrapper = document.createElement('li');
    discountItemWrapper.appendChild(new DiscountItem());
    this.discountItems.appendChild(discountItemWrapper);
  }*/
  clearInputs() {
    this.inputsWrapperList.innerHTML = "";
    this.addInputs();
  }
  setAddButton() {
    this.addButton.elementClassName = "add-button";
    this.addButton.elementTextContent = "+ Add";
    this.addButton.button.addEventListener("click", () => {
      this.addInputs();
    })
  }
  setClearButton() {
    this.clearButton.elementClassName = "clear-button";
    this.clearButton.elementTextContent = "Clear";
    this.clearButton.button.addEventListener("click", () => {
      this.clearInputs();
    })
  }
  getElementsReferences() {
    this.inputsWrapperList = this.shadowRoot.querySelector("ul");
    this.buttonsWrapper = this.shadowRoot.querySelector(".buttons-wrapper");
    this.addButton = this.buttonsWrapper.children[0];
    this.clearButton = this.buttonsWrapper.children[1];
  } 
}
customElements.define(DiscountDefinition.TAG, DiscountDefinition);