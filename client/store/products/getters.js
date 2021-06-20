import lodash from '../../node_modules/lodash-es'
import deepdash from '../../node_modules/deepdash-es'
const _ = deepdash(lodash)

export default {
  getProducts(state) {
    let apiProducts = [...state.products]
    let filteredProducts = []

    // sadece stoklu olanlar ya da tamamı
    if (state.showOnlyHasStock) {
      let hasStock = _.filterDeep(apiProducts, 'inStock', {
        childrenPath: ['InvOrg.webSites', 'sources', 'sourceParts'],
      })
      filteredProducts = hasStock
    } else {
      filteredProducts = apiProducts
    }
    // mfrName de bir seçim var ise;
    if (state.mfrCheckboxGroup.length > 0) {
      filteredProducts = filteredProducts.filter((el) =>
        state.mfrCheckboxGroup.includes(el.manufacturer.mfrName)
      )
    }
    // suppliers da bir seçim var ise;
    if (state.supplierCheckboxGroup.length > 0) {
      filteredProducts = _.filterDeep(
        filteredProducts,
        function (value) {
          return _.includes(state.supplierCheckboxGroup, value.displayName)
        },
        { childrenPath: ['InvOrg.webSites', 'sources'] }
      )
    }
    return filteredProducts
  },
  getManufacturerNames(state) {
    if (state.products) {
      const names = state.products.map((el) => el.manufacturer.mfrName)
      const removeDuplicates = [...new Set(names)].sort()

      const manufacturers = removeDuplicates.map((el) => {
        let objData = {
          id: Math.floor(Math.random() * 1000),
          name: el,
        }
        return objData
      })
      return manufacturers
      // bu duplicateleri kaldırıp tek bir array oluşturmanın kısa yolu -
      // yukarıdakinden farklı olarak haricen id ve name ile bir obje oluşturmadım
      // const manufacturers = [...new Set(state.products.map((mfr) => mfr.mfrName))]
      // return manufacturers
    }
  },
  getSupplierNames(state) {
    if (state.products) {
      const names = state.products
        .flatMap((el) => el.InvOrg.webSites)
        .flatMap((source) => source.sources)
        .map((sup) => sup.displayName)

      const removeDuplicates = [...new Set(names)].sort()

      const suppliers = removeDuplicates.map((el) => {
        let objData = {
          id: Math.floor(Math.random() * 1000),
          name: el,
        }
        return objData
      })
      return suppliers
    }
  },
}
