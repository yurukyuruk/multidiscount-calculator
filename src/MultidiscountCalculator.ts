import { DiscountDefinition } from './DiscountDefinition';
import { Products } from './Products';
import { Summary } from './Summary';
import { ProductGroup } from './ProductGroup';

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
      `,
};

export class MultidiscountCalculator extends HTMLElement {
  static TAG = 'multidiscount-calculator';
  static PRODUCT_GROUPING = new ProductGroup();
  shadowRoot!: ShadowRoot;
  discountDefinition!: DiscountDefinition;
  products!: Products;
  summary!: Summary;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
    this.initializeListeners();
  }
  generateSummaryListItems() {
    this.summary.clearProductsAndSavingListItems();
    const finalGroupsAndTheirDiscounts = MultidiscountCalculator.PRODUCT_GROUPING.useInputData(
      this.discountDefinition.getDiscountInputValues(),
      this.products.getProductInputValues()
    );
    finalGroupsAndTheirDiscounts.forEach((finalGroup) => {
      this.summary.createProductsAndSavingsListItem(
        finalGroup.itemCount,
        finalGroup.discountRatio,
        finalGroup.productNames,
        finalGroup.discountAmount
      );
    });
  }
  initializeListeners() {
    this.summary.addEventListener('generate-summary-if-inputs-are-filled', () => {
      if (
        this.discountDefinition.checkIfAnyInputInDiscountDefinitionIsEmpty() === true ||
        this.products.checkIfAnyInputInDiscountDefinitionIsEmpty() === true
      ) {
        this.summary.clearProductsAndSavingListItems();
        this.discountDefinition.displayErrorMessagesIfAnyInputIsEmptyInDiscountDefinition();
        this.products.displayErrorMessagesIfAnyInputIsEmptyInDiscountDefinition();
      } else {
        this.generateSummaryListItems();
      }
    });
  }
  getElementsReferences() {
    this.discountDefinition = this.shadowRoot.querySelector('discount-definition') as DiscountDefinition;
    this.products = this.shadowRoot.querySelector('products-element') as Products;
    this.summary = this.shadowRoot.querySelector('element-summary') as Summary;
  }
}
customElements.define(MultidiscountCalculator.TAG, MultidiscountCalculator);
