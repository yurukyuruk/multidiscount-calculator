 export class ProductGrouping extends HTMLElement {
    static TAG = "product-grouping";
    constructor() {
        super();
    }
    useInputData(discountInputValues, productInputValues) {
        const discountDefinitionSortedFromLowestItem = discountInputValues.sort((a, b) => {
            return a[0] - b[0];
        })
        //console.log(discountDefinitionSortedFromLowestItem); 
        

        const productsInformationSortedFromHighestPrice = productInputValues.sort((a, b) => {
            return b[1] - a[1];
        });
        //console.log(productsInformationSortedFromHighestPrice);

        const productsWithDiscountAmountsDependingOnAllItemAmounts = [];
        discountDefinitionSortedFromLowestItem.forEach((discountDefinitionRow) => {
            let productsWithDiscountAmountsDependingOnItemAmount = [];
            for(let i = 0; i < productsInformationSortedFromHighestPrice.length; i++) {
                let eachProductDiscountAmount = productsInformationSortedFromHighestPrice[i][1] * discountDefinitionRow[1] * 0.01;
                productsWithDiscountAmountsDependingOnItemAmount.push([productsInformationSortedFromHighestPrice[i][0], eachProductDiscountAmount]);
            }
            productsWithDiscountAmountsDependingOnAllItemAmounts.push(productsWithDiscountAmountsDependingOnItemAmount);
        });
        //console.log(productsWithDiscountAmountsDependingOnAllItemAmounts);
        let productsAndTheirProportionalDiscountForAnItemCount = [];
        for(let i = 0; i < productsWithDiscountAmountsDependingOnAllItemAmounts.length; i++) {
            for(let j = 0; j < productsWithDiscountAmountsDependingOnAllItemAmounts[i].length; j++) {
                let productsAndTheirProportionalDiscount = {
                    names: [], 
                    propotionalDiscount: 0 
                };
                let discountsForAnItemCount = [];
                productsAndTheirProportionalDiscount.names.push(productsWithDiscountAmountsDependingOnAllItemAmounts[i][j][0]);
                discountsForAnItemCount.push(productsWithDiscountAmountsDependingOnAllItemAmounts[i][j][1]);
                for(let k = j + 1; k < (j + Number(discountDefinitionSortedFromLowestItem[i][0])); k++) {
                    if(productsWithDiscountAmountsDependingOnAllItemAmounts[i][k]) {
                        productsAndTheirProportionalDiscount.names.push(productsWithDiscountAmountsDependingOnAllItemAmounts[i][k][0]);
                        discountsForAnItemCount.push(productsWithDiscountAmountsDependingOnAllItemAmounts[i][k][1]);
                    } else {
                        productsAndTheirProportionalDiscount.names.pop();
                        discountsForAnItemCount.pop();
                    }
                }
                if(productsAndTheirProportionalDiscount.names.length ===  Number(discountDefinitionSortedFromLowestItem[i][0])) {
                    let discountsForAnItemCountTotal = 0;
                    discountsForAnItemCount.forEach(num => {
                        discountsForAnItemCountTotal += Number(num);
                    })
                    let propotionalDiscountForAnItemCount = discountsForAnItemCountTotal / productsAndTheirProportionalDiscount.names.length;
                    productsAndTheirProportionalDiscount.propotionalDiscount = propotionalDiscountForAnItemCount;
                    productsAndTheirProportionalDiscountForAnItemCount.push(productsAndTheirProportionalDiscount); 
                }               
            }
        }
        //console.log(productsAndTheirProportionalDiscountForAnItemCount);
        let sortedProductsAndTheirProportionalDiscountForAnItemCount = productsAndTheirProportionalDiscountForAnItemCount.sort((a, b) => {
            return b.propotionalDiscount - a.propotionalDiscount;
        });

        const finalGroupsAndProportionOfTheirDiscount = [sortedProductsAndTheirProportionalDiscountForAnItemCount[0]];

        const productsNamesSortedFromHighestPrice = productsInformationSortedFromHighestPrice.map(([a, b]) => {
            return a;
        })
        console.log(productsNamesSortedFromHighestPrice);

       let finalGroupProductNames = [...sortedProductsAndTheirProportionalDiscountForAnItemCount[0].names];

       let iterated = [];
        
        let i = 0;
    if(sortedProductsAndTheirProportionalDiscountForAnItemCount[0].names.length !== productsNamesSortedFromHighestPrice.length) {
        do{  
            function filterObjectsByCondition(objArray, conditionArray, property) {
                return objArray.filter(obj => !obj[property].some(item => conditionArray.includes(item)));
            }
            // Example usage
            iterated = filterObjectsByCondition(sortedProductsAndTheirProportionalDiscountForAnItemCount, finalGroupProductNames, 'names');
            //filter array
            iterated[0].names.forEach((name) => {
                finalGroupProductNames.push(name);
            });
            finalGroupsAndProportionOfTheirDiscount.push(iterated[0]);
            iterated = [];
        i = finalGroupProductNames.length;
        } while(i < productsNamesSortedFromHighestPrice.length && (productsNamesSortedFromHighestPrice.length - i > Number(discountDefinitionSortedFromLowestItem[0][0])));
    }
    
        console.log(finalGroupsAndProportionOfTheirDiscount);
        }
  }
  customElements.define(ProductGrouping.TAG, ProductGrouping);