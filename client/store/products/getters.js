import lodash from '../../node_modules/lodash-es'
import deepdash from '../../node_modules/deepdash-es'
const _ = deepdash(lodash)

const getters = {
  getProducts(state) {
    let apiProducts = [...state.products]

    let filteredProducts = []

    // webSite adına göre sıralama - arrow.com lar en başta gelecek şekilde
    for (let i = 0; i < apiProducts.length; i++) {
      const sortedByWebSite = apiProducts[i].InvOrg.webSites
      for (let j = 0; j < sortedByWebSite.length; j++) {
        sortedByWebSite.sort(function (a, b) {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1
          }
          return 0
        })
      }
      filteredProducts = sortedByWebSite
    }

    // sadece stoklu olanlar gelsin;
    if (state.showOnlyHasStock) {
      let hasStock = _.filterDeep(apiProducts, 'inStock', {
        childrenPath: ['InvOrg.webSites', 'sources', 'sourceParts'],
      })
      filteredProducts = hasStock
    }
    // stok şartı yoksa tamamı gelsin;
    if (!state.showOnlyHasStock) filteredProducts = apiProducts

    // mfrName de bir seçim var ise;
    if (!lodash.isEmpty(state.mfrCheckboxGroup)) {
      filteredProducts = filteredProducts.filter((el) =>
        state.mfrCheckboxGroup.includes(el.manufacturer.mfrName)
      )
    }
    // suppliers da bir seçim var ise;
    if (!lodash.isEmpty(state.supplierCheckboxGroup)) {
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
      // duplicateleri kaldırmak için ...new Set() yapısından yararlandım
      const manufacturers = [
        ...new Set(state.products.map((el) => el.manufacturer.mfrName)),
      ].sort()

      return manufacturers
    }
  },
  getSupplierNames(state) {
    if (state.products) {
      const names = state.products
        .flatMap((el) => el.InvOrg.webSites)
        .flatMap((source) => source.sources)
        .map((sup) => sup.displayName)

      const suppliers = [...new Set(names)].sort()

      return suppliers
    } else {
      return null
    }
  },
}
export default getters
