import { buttons } from "./buttons.js";
import { inputs } from "./inputs.js";
const { template } = {
  template: `
    <style>  
    .product-section form legend {
        color:rgb(28, 28, 28);
        font-size: 20px;
        width: 90vw;
        padding-top: 20px;
        padding-bottom: 30px;
    }
    .discount-definition-section form legend {
        padding-top: 20px;
        padding-bottom: 30px;
    }
    .each-product-row{
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
    }
    .product-name-input-area, .price-input-area {
        position: relative;
    }
    .product-name-input-area label, .price-input-area label {
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
    #product-name, #price {
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
        .product-section form legend {
            width: 34vw;
        }
        #product-name, #price {
            width: 15vw;
        }
    }
  </style>
    <section class="product-section">
        <form action="" method="post">
            <legend>Products</legend>
            <div class="each-product-row">
                <div class="product-name-input-area">
                    <label for="product-name" class="product-name-label">Product name</label>
                    <input type="text" id="product-name" name="product-name">
                </div>
                <div class="price-input-area">
                    <label for="price" class="price-label">Price</label>
                    <input type="text" id="price" name="price">
                </div>                            
            </div>
        </form>
        <button type="button" class="add-button">+ Add</button>
    </section>
    `
};

export class Products extends HTMLElement {
  static TAG = "products";

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.initilizeListeners();
  }

  initilizeListeners() {
   
  }

  
}
customElements.define(Products.TAG, Products);