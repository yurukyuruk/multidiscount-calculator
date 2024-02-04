import { Header } from './Header';
import { DiscountDefinition } from './DiscountDefinition';
import { Products } from './Products';
import { Summary } from './Summary';
import { ProductGroup } from './ProductGroup';

const template = /*html*/ `
<style> 
.multidiscount-calculator-section {
  font-family: Arial, Helvetica, sans-serif;
  margin: auto;
  width: 90%;
} 
@media (min-width: 992px) {
  .multidiscount-calculator-section {
      display: flex;
      justify-content: space-between;
  }
}
</style>
<${Header.TAG}></${Header.TAG}>
<main class="multidiscount-calculator-section">
  <section>
      <${DiscountDefinition.TAG}></${DiscountDefinition.TAG}>
      <${Products.TAG}></${Products.TAG}>
  </section>
  <section>
      <${Summary.TAG}></${Summary.TAG}>
  </section>
</main>
`;
export class MultidiscountCalculator extends HTMLElement {
  static TAG = 'multidiscount-calculator';
  static PRODUCT_GROUPING = new ProductGroup();
  shadowRoot: ShadowRoot;
  header!: Header;
  discountDefinition!: DiscountDefinition;
  products!: Products;
  summary!: Summary;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
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
    this.addEventListener('copy-summary-list-items', () => {
        navigator.clipboard.writeText(this.summary.getTextContentOfGroupedProducts());
        this.header.showTooltip();
        setTimeout(() => {
          this.header.hideTooltip();
        }, 1500);
    })
  }
  getElementsReferences() {
    this.header = this.shadowRoot.querySelector(Header.TAG) as Header;
    this.discountDefinition = this.shadowRoot.querySelector(DiscountDefinition.TAG) as DiscountDefinition;
    this.products = this.shadowRoot.querySelector(Products.TAG) as Products;
    this.summary = this.shadowRoot.querySelector(Summary.TAG) as Summary;
  }
}
customElements.define(MultidiscountCalculator.TAG, MultidiscountCalculator);
