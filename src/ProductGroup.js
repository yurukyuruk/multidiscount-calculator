export class ProductGroup extends HTMLElement {
    static TAG = "product-group";
    constructor() {
        super();
    }
    useInputData(discountInputValues, productInputValues) {
        const discountDefinitionSortedFromLowestItem = discountInputValues.sort((a, b) => {
            return a.itemCount - b.itemCount;
        })
        //console.log(discountDefinitionSortedFromLowestItem); 
        const productsInformationSortedFromHighestPrice = productInputValues.sort((a, b) => {
            return b.price - a.price;
        });
        //console.log(productsInformationSortedFromHighestPrice);
        const productsAndTheirDiscountsWithItemCountArray = [];
        discountDefinitionSortedFromLowestItem.forEach((discountDefinition) => {
            let productsAndTheirDiscountsWithItemCount = [];
            productsInformationSortedFromHighestPrice.forEach((productInformation) => {
                let discountAmount = productInformation.price * discountDefinition.discount * 0.01;
                productsAndTheirDiscountsWithItemCount.push({
                    productName: productInformation.productName, 
                    itemCount: Number(discountDefinition.itemCount), 
                    discountRatio: Number(discountDefinition.discount), 
                    discountAmount: discountAmount
                });
            })
            productsAndTheirDiscountsWithItemCountArray.push(productsAndTheirDiscountsWithItemCount);
        });
        //console.log(productsAndTheirDiscountsWithItemCountArray);
        let productGroupsWithTheirItemCountAndDiscount = [];
        productsAndTheirDiscountsWithItemCountArray.forEach((productsAndTheirDiscountsWithItemCount) => {
            for(let i = 0; i < productsAndTheirDiscountsWithItemCount.length; i++) {
                let productGroupWithItsDiscountRatioAndDiscount = {
                    productNames: [], 
                    itemCount: 0,
                    discountRatio: 0,
                    discountAmount: 0 
                };
                let discountAmountsForAnItemCount = [];
                productGroupWithItsDiscountRatioAndDiscount.productNames.push(productsAndTheirDiscountsWithItemCount[i].productName);
                productGroupWithItsDiscountRatioAndDiscount.itemCount = productsAndTheirDiscountsWithItemCount[0].itemCount;
                productGroupWithItsDiscountRatioAndDiscount.discountRatio = productsAndTheirDiscountsWithItemCount[i].discountRatio;
                for(let j = i + 1; j < (i + productsAndTheirDiscountsWithItemCount[0].itemCount); j++) {
                    if(productsAndTheirDiscountsWithItemCount[j]) {
                        productGroupWithItsDiscountRatioAndDiscount.productNames.push(productsAndTheirDiscountsWithItemCount[j].productName);
                        discountAmountsForAnItemCount.push(productsAndTheirDiscountsWithItemCount[j].discountAmount);
                    } else {
                        productGroupWithItsDiscountRatioAndDiscount.productNames.pop();
                        discountAmountsForAnItemCount.pop();
                    }
                    if(productGroupWithItsDiscountRatioAndDiscount.productNames.length ===  productsAndTheirDiscountsWithItemCount[0].itemCount) {
                        productGroupWithItsDiscountRatioAndDiscount.discountAmount = Math.min(...discountAmountsForAnItemCount);
                        productGroupsWithTheirItemCountAndDiscount.push(productGroupWithItsDiscountRatioAndDiscount);
                    } 
                }               
            }
            
        })
        //console.log(productGroupsWithTheirItemCountAndDiscount);
        let sortedProductGroupsWithTheirItemCountAndDiscount = productGroupsWithTheirItemCountAndDiscount.sort((a, b) => {
            return b.discountAmount - a.discountAmount;
        });
        //console.log(sortedProductGroupsWithTheirItemCountAndDiscount);
        const finalGroups = [sortedProductGroupsWithTheirItemCountAndDiscount[0]];
        let finalGroupProductNames = [...sortedProductGroupsWithTheirItemCountAndDiscount[0].productNames];
        const quantityOfProductTypes = productInputValues.length;
        const quantityOfProductTypesAlreadyGrouped = sortedProductGroupsWithTheirItemCountAndDiscount[0].productNames.length;
        const minimumGroupNumber = Number(discountDefinitionSortedFromLowestItem[0].itemCount);
        let filteredSortedProductGroups = [];
        let i = 0;

        if(quantityOfProductTypes - quantityOfProductTypesAlreadyGrouped >= minimumGroupNumber) {
            do{  
                function filterObjectsByCondition(objArray, conditionArray, property) {
                    return objArray.filter(obj => !obj[property].some(item => conditionArray.includes(item)));
                }
                filteredSortedProductGroups = filterObjectsByCondition(sortedProductGroupsWithTheirItemCountAndDiscount, finalGroupProductNames, "productNames");       
                filteredSortedProductGroups[0].productNames.forEach((name) => {
                    finalGroupProductNames.push(name);
                });
                finalGroups.push(filteredSortedProductGroups[0]);
                filteredSortedProductGroups = [];
            i = finalGroupProductNames.length;
            } while(i < quantityOfProductTypes && (quantityOfProductTypes - i >= minimumGroupNumber));
        }
        console.log(finalGroups);
        return finalGroups;
    }  
  }
  customElements.define(ProductGroup.TAG, ProductGroup);