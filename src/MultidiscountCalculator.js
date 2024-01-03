import { DiscountDefinition } from "./DiscountDefinition.js";
import { Products } from "./Products.js";
import { Summary } from "./Summary.js";
import { ProductGrouping } from "./ProductGrouping.js";


const { template } = {
    template: `
      <style> 
      .multidiscount-calculator-section {
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
        width: 90vw;
      } 
      @media (min-width: 992px) {
        .multidiscount-calculator-section {
            display: flex;
            justify-content: space-between;
        }
    }
      </style>
      <section class="multidiscount-calculator-section">
        <section>
            <discount-definition></discount-definition>
            <products-element></products-element>
        </section>
        <section>
            <element-summary></element-summary>
        </section>
      </section>
      `
  };
  
  export class MultidiscountCalculator extends HTMLElement {
    static TAG = "multidiscount-calculator";
    static LIST_GENERATOR = new ProductGrouping();
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;
      this.getElementsReferences();  
      this.getDiscountDefinitionInputValues(); 
      this.getProductInputValues(); 
    }
    getDiscountDefinitionInputValues() {
      this.summary.generateButton.addEventListener("click", () => {
        MultidiscountCalculator.LIST_GENERATOR.useInputData(this.discountDefinition.getDiscountInputValues());    
      });
    }
    getProductInputValues() {
      this.summary.generateButton.addEventListener("click", () => {
        MultidiscountCalculator.LIST_GENERATOR.useInputData(this.products.getDiscountInputValues());    
      });
    }
    
    getElementsReferences() {
     this.discountDefinition = this.shadowRoot.querySelector("discount-definition");
     this.products = this.shadowRoot.querySelector("products-element");
     this.summary = this.shadowRoot.querySelector("element-summary");
    }
  }
  customElements.define(MultidiscountCalculator.TAG, MultidiscountCalculator);