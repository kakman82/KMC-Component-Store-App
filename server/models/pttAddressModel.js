const mongoose = require('mongoose')

const pttAddressSchema = new mongoose.Schema(
  {
    province: String,
    district: String,
    town: String,
    neighbourhood: String,
    pk: String,
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

module.exports = mongoose.model('PttAddress', pttAddressSchema)
