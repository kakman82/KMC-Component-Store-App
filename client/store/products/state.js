import apiTestResponse from '../../testResponse.js'
import oneProduct from '../../oneProdResponse'
import oneProduct2 from '../../one2ProdResponse'

const state = () => ({
  //products: apiTestResponse,
  //products: oneProduct2,
  search: null,
  products: [],
  showOnlyHasStock: true,
  mfrCheckboxGroup: [],
  supplierCheckboxGroup: [],
})

export default state
