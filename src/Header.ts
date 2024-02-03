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
                <img src="../images/copy.png" class="copy-image">
                <${Button.TAG} class="copy-button"></${Button.TAG}>
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
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.getElementsReferences();
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
  getElementsReferences() {
    this.copyButton = this.shadowRoot.querySelector(".copy-button") as Button;
    this.whatsappButton = this.shadowRoot.querySelector(".whatsapp-button") as Button;
    this.emailButton = this.shadowRoot.querySelector(".email-button") as Button;
  }
}
customElements.define(Header.TAG, Header);