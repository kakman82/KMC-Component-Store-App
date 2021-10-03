const mongoose = require('mongoose')

const billingAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    billType: {
      type: String,
      enum: ['kurumsal', 'bireysel'],
    },
    companyName: String,
    companyTaxNumber: String,
    companyTaxOffice: String,
    personFullName: String,
    personIDNumber: String,
    province: String,
    district: String,
    neighbourhood: String,
    fullAddress: String,
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
module.exports = mongoose.model('BillingAddress', billingAddressSchema)
