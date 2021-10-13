const deliveryAddress = {
  firstName: 'John',
  lastName: 'Doe',
  companyName: 'Company Co.',
  phone: '05555555555',
  province: 'London',
  district: 'Manchester',
  neighbourhood: 'United',
  fullAddress: 'some avenue 5th street ',
  title: 'Home',
  createdAt: {
    $date: '2021-08-17T18:51:24.492Z',
  },
  updatedAt: {
    $date: '2021-08-17T18:51:24.492Z',
  },
  __v: 0,
}

const order = {
  _id: { $oid: '611fc0a22fb9c612ca9b0527' },
  status: 'Tedarik Aşamasında',
  products: [
    {
      productCartId: 1629469337205,
      productId: 4177161,
      productName: 'BAS16E6433HTMA1',
      productManufacturer: 'Infineon Technologies',
      productDescription:
        'Rectifier Diode Switching 85V 0.25A 4ns Automotive 3-Pin SOT-23 T/R',
      productCategory: 'Rectifiers',
      productImage:
        'https://static6.arrow.com/aropdfconversion/arrowimages/d65875dacee0687b8e913ad10bbeb2e44f08a5bd/sot23_lowres.jpg_472149771.jpg',
      productSupplier: 'Arrow Americas',
      productUnitPrice: 0.0127,
      productCurrency: 'USD',
      productTotalPrice: 12.7,
      productTotalPriceTL: 108.47,
      productCurrencyValue: 8.5407,
      productCurrencyDate: '08/20/2021 15:30 (GMT+3)',
      productQuantity: 1000,
    },
    {
      productCartId: 1629469326889,
      productId: 2526305,
      productName: 'BAS16WH6327XTSA1',
      productManufacturer: 'Infineon Technologies',
      productDescription:
        'Diode Switching 85V 0.25A Automotive 3-Pin SOT-323 T/R',
      productCategory: 'Rectifiers',
      productImage:
        'https://static6.arrow.com/aropdfconversion/arrowimages/27e006f3f9cb502f2d67fe749c0a0b420d7a7039/sot323_blue_lowres.jpg_472149771.jpg',
      productSupplier: 'Arrow Americas',
      productUnitPrice: 0.0157,
      productCurrency: 'USD',
      productTotalPrice: 73.62,
      productTotalPriceTL: 628.77,
      productCurrencyValue: 8.5407,
      productCurrencyDate: '08/20/2021 15:30 (GMT+3)',
      productQuantity: 4689,
    },
    {
      productCartId: 1629469302404,
      productId: 2456787,
      productName: 'BAS16TW-7-F',
      productManufacturer: 'Diodes Zetex',
      productDescription:
        'Rectifier Diode Small Signal Switching 75V 0.3A 4ns 6-Pin SOT-363 T/R',
      productCategory: 'Rectifiers',
      productImage:
        'https://static6.arrow.com/aropdfconversion/arrowimages/4c43eaafb0578655b64981350d0e31dc3995e01/sot363.jpg',
      productSupplier: 'Asia',
      productUnitPrice: 0.0567,
      productCurrency: 'USD',
      productTotalPrice: 170.1,
      productTotalPriceTL: 1452.77,
      productCurrencyValue: 8.5407,
      productCurrencyDate: '08/20/2021 15:30 (GMT+3)',
      productQuantity: 3000,
    },
    {
      productCartId: 1629469044888,
      productId: 33363467,
      productName: 'BAS16',
      productManufacturer: 'ON Semiconductor',
      productDescription:
        'Rectifier Diode Small Signal Switching 85V 0.2A 6ns 3-Pin SOT-23 T/R',
      productCategory: 'Rectifiers',
      productImage:
        'https://static6.arrow.com/aropdfconversion/arrowimages/cdbbcd5b550f69cb57198f33704acb75e5ea1be2/sot-23.jpg',
      productSupplier: 'Verical',
      productUnitPrice: 0.0335,
      productCurrency: 'USD',
      productTotalPrice: 201,
      productTotalPriceTL: 1716.68,
      productCurrencyValue: 8.5407,
      productCurrencyDate: '08/20/2021 15:30 (GMT+3)',
      productQuantity: 6000,
    },
  ],
  user: { $oid: '60f6ea54a4213b04501d38b8' },
  deliveryAddress: { $oid: '611bdafce8bcc31d7d527438' },
  orderId: 'KMC-kskgw3ezkskgw3ey',
  tax: 808.4,
  serviceFee: 584.44,
  serviceFeeRate: 14.96,
  total: 3906.69,
  sumTotal: 5299.53,
  createdAt: { $date: '2021-08-20T17:48:02.194Z' },
  updatedAt: { $date: '2021-08-20T17:48:02.194Z' },
  __v: 0,
}

module.exports = { deliveryAddress, order }
