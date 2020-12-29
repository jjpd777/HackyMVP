
  export const sumShopSales = (shopSales) => {
    var salesTotal = 0;
    shopSales.map((item) => {
      const purchaseSummary = item.summary;
      salesTotal += purchaseSummary.status === "valid" ? Number(purchaseSummary.total) : 0;
    })
    return salesTotal;
  };
  export function bubbleSort(arr){
    var len = arr.length;
    for (var i = len-1; i>=0; i--){
      for(var j = 1; j<=i; j++){
        if(arr[j-1][1] >arr[j][1]){
            var temp = arr[j-1];
            arr[j-1] = arr[j];
            arr[j] = temp;
         }
      }
    }
    return arr;
 }