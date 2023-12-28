//import { Buttons } from "./Buttons.js";
//import { Inputs } from "./Inputs.js";
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
    }
    .discount-definition-section form details summary {
        padding-top: 20px;
        padding-bottom: 30px;
    }
    .each-discount-definition-row {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
    }
    .item-count-input-area, .discount-input-area {
        position: relative;
    }
    .item-count-input-area label, .discount-input-area label {
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
    #item-count, #discount {
        width: 40vw;
        height: 30px;
        border-radius: 5px;
        border: 1px solid rgb(116, 116, 116);
    }
    .add-button {
        background-color: rgb(104,81,166);
        color: white;
        border: none;
        border-radius: 15px;
        height: 25px;
        width: 60px;
        margin-top: 20px;
        margin-bottom: 30px;
        cursor: pointer;
    }
    @media (min-width: 992px) {
        .discount-definition-section form details summary {
            width: 34vw;
        }
        #item-count, #discount {
            width: 15vw;
        }
    }
  </style>
    <section class="discount-definition-section">
        <form action="" method="post">
            <details>
                <summary>Discount Definition</summary>
                <div class="each-discount-definition-row">
                    <div class="item-count-input-area">
                        <label for="item-count">Item count</label>
                        <input type="text" id="item-count" name="item-count">
                    </div>
                    <div class="discount-input-area">
                        <label for="discount">Discount</label>
                        <input type="text" id="discount" name="discount">
                    </div>
                </div>
                <button type="button" class="add-button">+ Add</button>
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
 
  }



  
}
customElements.define(DiscountDefinition.TAG, DiscountDefinition);