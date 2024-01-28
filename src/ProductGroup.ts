import {
  DiscountInputValue,
  ProductInputValue,
  ProductAndItsDiscountWithItemCount,
  ProductsAndTheirDiscountsWithItemCount,
  ProductGroupWithItsDiscountRatioAndDiscount,
} from './types/typesAndInterfaces';

export class ProductGroup extends HTMLElement {
  static TAG = 'product-group';
  constructor() {
    super();
  }
  useInputData(discountInputValues: DiscountInputValue[], productInputValues: ProductInputValue[]) {
    const discountDefinitionSortedFromLowestItem = discountInputValues.sort(
      (a, b) => Number(a.itemCount) - Number(b.itemCount)
    );
    //console.log(discountDefinitionSortedFromLowestItem);
    const productsInformationSortedFromHighestPrice = productInputValues.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
    //console.log(productsInformationSortedFromHighestPrice);
    const productsAndTheirDiscountsWithItemCountArray: ProductsAndTheirDiscountsWithItemCount[] = [];
    discountDefinitionSortedFromLowestItem.forEach((discountDefinition) => {
      const productsAndTheirDiscountsWithItemCount: ProductAndItsDiscountWithItemCount[] = [];
      productsInformationSortedFromHighestPrice.forEach((productInformation) => {
        const discountAmount = Number(productInformation.price) * Number(discountDefinition.discount) * 0.01;
        productsAndTheirDiscountsWithItemCount.push({
          productName: productInformation.productName,
          itemCount: Number(discountDefinition.itemCount),
          discountRatio: Number(discountDefinition.discount),
          discountAmount: discountAmount,
        });
      });
      productsAndTheirDiscountsWithItemCountArray.push(productsAndTheirDiscountsWithItemCount);
    });
    //console.log(productsAndTheirDiscountsWithItemCountArray);
    const productGroupsWithTheirItemCountAndDiscount: ProductGroupWithItsDiscountRatioAndDiscount[] = [];
    productsAndTheirDiscountsWithItemCountArray.forEach((productsAndTheirDiscountsWithItemCount) => {
      for (let i = 0; i < productsAndTheirDiscountsWithItemCount.length; i++) {
        const productGroupWithItsDiscountRatioAndDiscount: ProductGroupWithItsDiscountRatioAndDiscount = {
          productNames: [],
          itemCount: 0,
          discountRatio: 0,
          discountAmount: 0,
        };
        const discountAmountsForAnItemCount = [];
        productGroupWithItsDiscountRatioAndDiscount.productNames.push(
          productsAndTheirDiscountsWithItemCount[i].productName
        );
        productGroupWithItsDiscountRatioAndDiscount.itemCount = productsAndTheirDiscountsWithItemCount[0].itemCount;
        productGroupWithItsDiscountRatioAndDiscount.discountRatio =
          productsAndTheirDiscountsWithItemCount[i].discountRatio;
        for (let j = i + 1; j < i + productsAndTheirDiscountsWithItemCount[0].itemCount; j++) {
          if (productsAndTheirDiscountsWithItemCount[j]) {
            productGroupWithItsDiscountRatioAndDiscount.productNames.push(
              productsAndTheirDiscountsWithItemCount[j].productName
            );
            discountAmountsForAnItemCount.push(productsAndTheirDiscountsWithItemCount[j].discountAmount);
          } else {
            productGroupWithItsDiscountRatioAndDiscount.productNames.pop();
            discountAmountsForAnItemCount.pop();
          }
          if (
            productGroupWithItsDiscountRatioAndDiscount.productNames.length ===
            productsAndTheirDiscountsWithItemCount[0].itemCount
          ) {
            productGroupWithItsDiscountRatioAndDiscount.discountAmount = Math.min(...discountAmountsForAnItemCount);
            productGroupsWithTheirItemCountAndDiscount.push(productGroupWithItsDiscountRatioAndDiscount);
          }
        }
      }
    });
    //console.log(productGroupsWithTheirItemCountAndDiscount);
    const sortedProductGroupsWithTheirItemCountAndDiscount = productGroupsWithTheirItemCountAndDiscount.sort(
      (a, b) => b.discountAmount - a.discountAmount
    );
    //console.log(sortedProductGroupsWithTheirItemCountAndDiscount);
    const finalGroups = [sortedProductGroupsWithTheirItemCountAndDiscount[0]];
    const finalGroupProductNames = [...sortedProductGroupsWithTheirItemCountAndDiscount[0].productNames];
    const quantityOfProductTypes = productInputValues.length;
    const quantityOfProductTypesAlreadyGrouped =
      sortedProductGroupsWithTheirItemCountAndDiscount[0].productNames.length;
    const minimumGroupNumber = Number(discountDefinitionSortedFromLowestItem[0].itemCount);
    let filteredSortedProductGroups = [];
    let i = 0;

    function filterObjectsByCondition(
      objArray: ProductGroupWithItsDiscountRatioAndDiscount[],
      conditionArray: string[],
    ) {
      return objArray.filter(
        (obj) => !obj.productNames.some((item: string) => conditionArray.includes(item))
      );
    }

    if (quantityOfProductTypes - quantityOfProductTypesAlreadyGrouped >= minimumGroupNumber) {
      do {
        filteredSortedProductGroups = filterObjectsByCondition(
          sortedProductGroupsWithTheirItemCountAndDiscount,
          finalGroupProductNames
        );
        filteredSortedProductGroups[0].productNames.forEach((name) => {
          finalGroupProductNames.push(name);
        });
        finalGroups.push(filteredSortedProductGroups[0]);
        filteredSortedProductGroups = [];
        i = finalGroupProductNames.length;
      } while (i < quantityOfProductTypes && quantityOfProductTypes - i >= minimumGroupNumber);
    }
    console.log(finalGroups);
    return finalGroups;
  }
}
customElements.define(ProductGroup.TAG, ProductGroup);
