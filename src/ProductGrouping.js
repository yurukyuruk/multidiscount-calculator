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
                    discountRatio: 0,
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
                    let discountsForAnItemCountTotal = [];
                    discountsForAnItemCount.forEach(num => {
                        discountsForAnItemCountTotal.push(Number(num));
                    })
                    let propotionalDiscountForAnItemCount = Math.min(...discountsForAnItemCountTotal);
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
        //console.log(productsNamesSortedFromHighestPrice);
       let finalGroupProductNames = [...sortedProductsAndTheirProportionalDiscountForAnItemCount[0].names];
       let iterated = [];  
        let i = 0;
    if(productsNamesSortedFromHighestPrice.length - sortedProductsAndTheirProportionalDiscountForAnItemCount[0].names.length >= Number(discountDefinitionSortedFromLowestItem[0][0])) {
        do{  
            function filterObjectsByCondition(objArray, conditionArray, property) {
                return objArray.filter(obj => !obj[property].some(item => conditionArray.includes(item)));
            }
            iterated = filterObjectsByCondition(sortedProductsAndTheirProportionalDiscountForAnItemCount, finalGroupProductNames, 'names');       
            iterated[0].names.forEach((name) => {
                finalGroupProductNames.push(name);
            });
            finalGroupsAndProportionOfTheirDiscount.push(iterated[0]);
            iterated = [];
        i = finalGroupProductNames.length;
        } while(i < productsNamesSortedFromHighestPrice.length && (productsNamesSortedFromHighestPrice.length - i > Number(discountDefinitionSortedFromLowestItem[0][0])));
    }

    finalGroupsAndProportionOfTheirDiscount.forEach((finalGroup) => {
       const discountInformation = discountDefinitionSortedFromLowestItem.find((discount) => {
            return finalGroup.names.length == discount[0];
        });
        finalGroup.discountRatio = Number(discountInformation[1]);
    })
    

        console.log(finalGroupsAndProportionOfTheirDiscount);
        return finalGroupsAndProportionOfTheirDiscount;
    }  
  }
  customElements.define(ProductGrouping.TAG, ProductGrouping);