import { DiscountInputsWrapper } from './DiscountInputsWrapper';
import { Button } from './Button';

const { template } = {
  template: `
    <style>  
    section {
        border-bottom: 1px solid  rgb(116, 116, 116);
    }
    details {
      display: flex;
      flex-direction: column;
    }
    summary {
        color:rgb(28, 28, 28);
        font-size: 20px;
        width: 90vw;
        padding-top: 20px;
        padding-bottom: 20px;
        cursor: pointer;
    }
    ul {
      margin: 0;
      padding: 0;
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
                <ul class = "inputs-wrapper-list">
                  <discount-inputs-wrapper></discount-inputs-wrapper>
                </ul>
                <div class="buttons-wrapper">
                  <element-button class="add-button"></element-button>
                  <element-button class="clear-button"></element-button>
                </div>
            </details>
        </form>
    </section>
    `,
};

export class DiscountDefinition extends HTMLElement {
  static TAG = 'discount-definition';
  static DISCOUNT_INPUT_INFORMATION: [string, string, string, string, string, string] = [
    'item-count-input-area',
    'item-count',
    'Item count',
    'discount-input-area',
    'discount',
    'Discount',
  ];
  shadowRoot!: ShadowRoot;
  inputsWrapperList!: HTMLUListElement;
  discountInputsWrapper!: DiscountInputsWrapper;
  discountInputsWrappers!: DiscountInputsWrapper[];
  buttonsWrapper!: HTMLDivElement;
  addButton!: Button;
  clearButton!: Button;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
    this.initializeListeners();
    this.discountInputsWrapper.setInputs(...DiscountDefinition.DISCOUNT_INPUT_INFORMATION);
    this.setAddButton();
    this.setClearButton();
    this.setEventListenerToDeleteButtonOfFirstInput();
  }
  setEventListenerToDeleteButtonOfFirstInput() {
    this.discountInputsWrapper.addEventListenerToDeleteButton(() => {
      this.discountInputsWrapper.remove();
    });
  }
  addNewInputs() {
    const newInputsWrapper = new DiscountInputsWrapper();
    newInputsWrapper.setInputs(...DiscountDefinition.DISCOUNT_INPUT_INFORMATION);
    newInputsWrapper.addEventListenerToDeleteButton(() => {
      newInputsWrapper.remove();
    });
    this.inputsWrapperList.append(newInputsWrapper);
  }
  setAddButton() {
    this.addButton.className = 'add-button';
    this.addButton.textContent = '+ Add';
  }
  setClearButton() {
    this.clearButton.className = 'clear-button';
    this.clearButton.textContent = 'Clear';
  }
  initializeListeners() {
    this.addButton.addEventListener('click', () => {
      this.addNewInputs();
    });
    this.clearButton.addEventListener('click', () => {
      this.inputsWrapperList.innerHTML = '';
      this.addNewInputs();
    });
  }
  getDiscountInputValues() {
    const discountInputValues: { itemCount: string; discount: string }[] = [];
    const inputsWrappers = this.shadowRoot.querySelectorAll<DiscountInputsWrapper>('discount-inputs-wrapper');
    inputsWrappers.forEach((wrapper) => {
      discountInputValues.push(wrapper.getInputValues());
    });
    return discountInputValues;
  }
  checkIfAnyInputInDiscountDefinitionIsEmpty() {
    this.discountInputsWrappers = [
      ...this.shadowRoot.querySelectorAll<DiscountInputsWrapper>('discount-inputs-wrapper'),
    ];
    return this.discountInputsWrappers.some(
      (discountInputsWrapper) => discountInputsWrapper.checkIfAnyInputIsEmpty() === true
    );
  }
  displayErrorMessagesIfAnyInputIsEmptyInDiscountDefinition() {
    this.discountInputsWrappers = [
      ...this.shadowRoot.querySelectorAll<DiscountInputsWrapper>('discount-inputs-wrapper'),
    ];
    this.discountInputsWrappers.forEach((discountInputsWrapper) => {
      discountInputsWrapper.displayErrorMessagesIfAnyInputIsEmpty();
    });
  }
  getElementsReferences() {
    this.inputsWrapperList = this.shadowRoot.querySelector('.inputs-wrapper-list') as HTMLUListElement;
    this.discountInputsWrapper = this.shadowRoot.querySelector('discount-inputs-wrapper') as DiscountInputsWrapper;
    this.buttonsWrapper = this.shadowRoot.querySelector('.buttons-wrapper') as HTMLDivElement;
    this.addButton = this.shadowRoot.querySelector('.add-button') as Button;
    this.clearButton = this.shadowRoot.querySelector('.clear-button') as Button;
  }
}
customElements.define(DiscountDefinition.TAG, DiscountDefinition);
