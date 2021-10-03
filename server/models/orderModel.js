const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    orderNo: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        'Ödeme Bekliyor',
        'Tedarik Aşamasında',
        'Yola Çıktı',
        'Teslim Edildi',
        'İptal',
      ],
      default: 'Ödeme Bekliyor',
    },
    products: {
      type: Array,
    },
    tax: Number,
    serviceFee: Number,
    serviceFeeRate: Number,
    total: Number,
    sumTotal: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    deliveryAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeliveryAddress',
    },
    billingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BillingAddress',
    },
  },
  {
    // created ve updated at alanlarında tam gmt saati göstermesi için;
    timestamps: {
      currentTime: () => {
        let currDate = new Date()
        let utc_offset = currDate.getTimezoneOffset()
        let result = currDate.setMinutes(currDate.getMinutes() - utc_offset)
        return result
      },
    },
  }
)
module.exports = mongoose.model('Order', orderSchema)
