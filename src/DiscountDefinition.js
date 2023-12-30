import { Button } from "./Button.js";
import { Input } from "./Input.js";
const { template } = {
  template: `
    <style>  
    .discount-definition-section {
        border-bottom: 1px solid  rgb(116, 116, 116);
    }
    .discount-definition-section form details summary {
        color:rgb(28, 28, 28);
        font-size: 20px;
        width: 90vw;
        padding-top: 20px;
        padding-bottom: 30px;
    }
    .inputs-wrapper {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
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
                <div class="inputs-wrapper">
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
    this.addButton();
    this.addInputs();
  }
  addInputs() {
    const itemCountInput = new Input("item-count-input-area", "item-count", "Item count");
    this.inputsWrapper.append(itemCountInput);
    const discountInput = new Input("discount-input-area", "discount", "Discount");
    this.inputsWrapper.append(discountInput);
  }
  addButton() {
    const button = new Button("+ Add", "add-button");
    this.details.append(button);
  }
  getElementsReferences() {
    this.inputsWrapper = this.shadowRoot.querySelector(".inputs-wrapper");
    this.details = this.shadowRoot.querySelector("details");
  } 
}
customElements.define(DiscountDefinition.TAG, DiscountDefinition);