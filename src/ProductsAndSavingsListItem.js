const { template } = {
    template: `
      <style>  
      .grouped-product {
        display: flex;
        justify-content: space-between;
        background-color: rgb(248, 242, 251);
        border-radius: 10px;
        padding: 10px;
        margin-top: 20px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      }
      .products-list-part {
            border-right: 1px solid rgb(28, 28, 28);
            width: 45vw;
            padding: 10px;
      }
      .savings-part {
            align-self: center;
            width: 45vw;
            padding: 10px;
      }
      .products-list-part h2, .savings-part h2 {
        margin: 0;
      }
      .products-list-part h2 {
        color:rgb(28, 28, 28);
        font-size: 20px;
        font-weight: 200;
      }
      .products-list-part ul {
        margin-left: 32px;
        padding-top: 20px;
      }  
      .savings-part h2 {
        color:rgb(28, 28, 28);
        font-size: 20px;
        align-self: center;
        padding-left: 20px;
      }
      @media (min-width: 992px) {
        .products-list-part {
            width: 20vw;
        }
        .savings-part {
            width: 20vw;
        }
      }
      </style>
      <li class="grouped-product">
            <div class="products-list-part">
                <h2>2 Products, 35% Discount</h2>
                <ul>
                    <li>Fridge</li>
                    <li>Oven</li>
                </ul>
            </div>
            <div class="savings-part">
                <h2>SAVINGS: 1750</h2>
            </div>
      </li>
      `
  };
  
  export class ProductsAndSavingsListItem extends HTMLElement {
    static TAG = "products-and-savings-list-item";
  
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;
      this.getElementsReferences();   
    }
    getElementsReferences() {

    }
  }
  customElements.define(ProductsAndSavingsListItem.TAG, ProductsAndSavingsListItem);