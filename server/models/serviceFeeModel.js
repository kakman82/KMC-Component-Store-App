const mongoose = require('mongoose')

const serviceFeeSchema = new mongoose.Schema(
  {
    serviceFee: {
      type: mongoose.Types.Decimal128,
      required: [true, 'Lütfen servis hizmet bedel oranını giriniz.'],
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

module.exports = mongoose.model('ServiceFee', serviceFeeSchema)
