import lodash from '../../node_modules/lodash-es'
import deepdash from '../../node_modules/deepdash-es'
import { fil } from 'date-fns/locale'
const _ = deepdash(lodash)

export default {
  getProducts(state) {
    let apiProducts = [...state.products]
    let filteredProducts = []

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
