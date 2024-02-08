import { Button } from './Button';
const template = /*html*/ `
      <style>  
      </style>
      <${Button.TAG} class="fab-button"></${Button.TAG}>
      `;

export class FabButton extends HTMLElement {
  static TAG = 'fab-button';
  shadowRoot: ShadowRoot;
  fabButton!: Button;
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
    this.initializeListeners();
    this.setClassName();
  }
  setClassName() {
    this.fabButton.className = 'fab-button';
  }
  initializeListeners() {
    this.fabButton.addEventListener('click', () => {
      const shareOnMobile = new CustomEvent('share-on-mobile', {
        bubbles: true,
        composed: true,
      });
      this.shadowRoot.dispatchEvent(shareOnMobile);
    });
  }
  getElementsReferences() {
    this.fabButton = this.shadowRoot.querySelector('.fab-button') as Button;
  }
}
customElements.define(FabButton.TAG, FabButton);
