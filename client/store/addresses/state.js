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
  billingAddress: {},
})
export default state
