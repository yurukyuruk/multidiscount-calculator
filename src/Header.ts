import { Button } from './Button';

const template = /*html*/ `
      <style> 
        header{
            font-family: Arial, Helvetica, sans-serif;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
            padding-left: 5px;
            padding-right: 5px;
        } 
        h1 {
            font-size: 20px;
        }
        div {
            display: flex;
            flex-direction: row;
        }
        .copy-button-wrapper, .whatsapp-button-wrapper, .email-button-wrapper {
            position: relative;
        }
        .copy-button-wrapper {
            display: block;
        }
        .tooltip {
            position: relative;
            visibility: hidden;
        }
        .tooltip-text::before {
            content: "Copied!";
            position: absolute;
            left: 38px;
            top: 6px;
        }
        .tooltip-text {
            position: absolute;
            top: -4px;
            background-color: rgb(104,81,166);
            color: white;
            font-size: 13.3px;
            width: 120px;
            height: 30px;
            border-radius: 15px;
        }
        .tooltip-arrow {
            position: absolute;
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 6px solid rgb(104,81,166); 
            top: 4px; 
            left: 57px;
        }

        .copy-image{
            width: 15px;
            position: absolute;
            left: 25px;
            top: 7.5px;
        }
        .whatsapp-image{
            width: 15px;
            position: absolute;
            left: 10px;
            top: 7.5px;
        }
        .email-image{
            width: 15px;
            position: absolute;
            left: 21px;
            top: 7.5px;
        }
        @media (max-width: 768px) {
            .whatsapp-button-wrapper, .email-button-wrapper {
                display: none;
            }
        }
      </style>
      <header>
        <div>
            <h1>Multidiscount Calculator</h1>
        </div>
        <div class"buttons">
            <div class="copy-button-wrapper">
                <div>
                    <img src="../images/copy.png" class="copy-image">
                    <${Button.TAG} class="copy-button"></${Button.TAG}>
                </div>
                <div class="tooltip">
                    <p class="tooltip-text"></p>
                    <span class="tooltip-arrow"></span>
                </div>
            </div>
            <div class="whatsapp-button-wrapper">
                <img src="../images/whatsapp.png" class="whatsapp-image">
                <${Button.TAG} class="whatsapp-button"></${Button.TAG}>
            </div>
            <div class="email-button-wrapper">
                <img src="../images/email.png" class="email-image">
                <${Button.TAG} class="email-button"></${Button.TAG}>
            </div>
        </div>
      </header>
      `;

export class Header extends HTMLElement {
  static TAG = 'element-header';
  shadowRoot: ShadowRoot;
  copyButton!: Button;
  whatsappButton!: Button;
  emailButton!: Button;
  tooltip!: HTMLDivElement;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
    this.initializeListeners();
    this.setClassNamesAndTextContentToButtons();
  }
  setClassNamesAndTextContentToButtons() {
    this.copyButton.className = "copy-button";
    this.copyButton.textContent = "Copy";
    this.whatsappButton.className = "whatsapp-button";
    this.whatsappButton.textContent = "WhatsApp";
    this.emailButton.className = "email-button";
    this.emailButton.textContent = "E-mail";
  }
  initializeListeners() {
    this.copyButton.addEventListener('click', () => {
        const copySummaryListItems = new CustomEvent('copy-summary-list-items', {
          bubbles: true,
          composed: true,
        });
        this.shadowRoot.dispatchEvent(copySummaryListItems);
    });
    this.whatsappButton.addEventListener('click', () => {
        const shareOnWhatsappWeb = new CustomEvent('share-on-whatsapp-web', {
          bubbles: true,
          composed: true,
        });
        this.shadowRoot.dispatchEvent(shareOnWhatsappWeb);
    });
    this.emailButton.addEventListener('click', () => {
        const shareViaEmail = new CustomEvent('share-via-email', {
          bubbles: true,
          composed: true,
        });
        this.shadowRoot.dispatchEvent(shareViaEmail);
    });
  }
  showTooltip() {
    this.tooltip.style.visibility= "visible";
  }
  hideTooltip() {
    this.tooltip.style.visibility= "hidden";
  }
  getElementsReferences() {
    this.copyButton = this.shadowRoot.querySelector(".copy-button") as Button;
    this.whatsappButton = this.shadowRoot.querySelector(".whatsapp-button") as Button;
    this.emailButton = this.shadowRoot.querySelector(".email-button") as Button;
    this.tooltip = this.shadowRoot.querySelector(".tooltip") as HTMLDivElement;
  }
}
customElements.define(Header.TAG, Header);