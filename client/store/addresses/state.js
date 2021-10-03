const state = () => ({
  modalForms: {
    showAddDeliveryAddress: false,
    showUpdateDeliveryAddress: false,
    showAddBillingAddress: false,
    showUpdateBillingAddress: false,
  },
  provinces: [],
  districts: [],
  neighbourhoods: [],
  deliveryAddresses: [],
  selectedDeliveryAddress: {},
  billingAddress: {},
})
export default state
