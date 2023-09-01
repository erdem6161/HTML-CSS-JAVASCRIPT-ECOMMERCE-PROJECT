export default function priceFunc(gelenProduct, selectPrice, selectRadio) {
    if (selectPrice === "allPrice") {
      // console.log("allPrice olunca hangi indexleri filtreledin", );
      return rateFunc(gelenProduct, selectRadio);
    }
    if (selectPrice === "0-10") {
      if (gelenProduct.price > 0 && gelenProduct.price <= 10) {
        // console.log("0-10 olunca hangi indexleri filtreledin", );
        return rateFunc(gelenProduct, selectRadio);
      }
    }
    if (selectPrice === "10-100") {
      if (gelenProduct.price > 10 && gelenProduct.price <= 100) {
        // console.log("10-100 olunca hangi indexleri filtreledin", );
        return rateFunc(gelenProduct, selectRadio );
      }
    }
    if (selectPrice === "100-500") {
      if (gelenProduct.price > 100 && gelenProduct.price <= 500) {
        // console.log("100-500 olunca hangi indexleri filtreledin", );
        return rateFunc(gelenProduct, selectRadio);
      }
    }
    if (selectPrice === "500-") {
      if (gelenProduct.price > 500) {
        // console.log("500- olunca hangi indexleri filtreledin", );
        return rateFunc(gelenProduct, selectRadio);
      }
    }
  }

 function rateFunc(gelenProduct, selectRadio){
  console.log('selectRadio',selectRadio)
  if (selectRadio === 'allRate') {
    console.log('gelenProduct',gelenProduct,'selectRadio,',selectRadio)
    return gelenProduct;
  }
  if (selectRadio === '1-5' && gelenProduct.rating.rate >=1)  {
    return gelenProduct;
  }
  if (selectRadio === '2-5' && gelenProduct.rating.rate >=2)  {
    return gelenProduct;
  }
  if (selectRadio === '3-5' && gelenProduct.rating.rate >=3)  {
    return gelenProduct;
  }
  if (selectRadio === '4-5' && gelenProduct.rating.rate >=4)  {
    return gelenProduct;
  }
}
