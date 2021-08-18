const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Tedarik Aşamasında', 'Yola Çıktı', 'Teslim Edildi'],
      default: 'Tedarik Aşamasında',
    },
    products: {
      type: Array,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    deliveryAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
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
