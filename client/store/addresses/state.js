const state = () => ({
  modalForms: {
    showAddDeliveryAddress: false,
    showAddBillingAddress: false,
  },
  provinces: [],
  districts: [],
  neighbourhoods: [],
  deliveryAddresses: [],
  selectedDeliveryAddress: {},
  billingAddress: null,
})
export default state
