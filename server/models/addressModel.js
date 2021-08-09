const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    firstName: {
      type: String,
      required: [true, 'Lütfen teslim alacak kişi adını giriniz!'],
    },
    lastName: {
      type: String,
      required: [true, 'Lütfen teslim alacak kişi soyadını giriniz!'],
    },
    companyName: {
      type: String,
      required: [true, 'Lütfen şirketinizin adını giriniz!'],
    },
    phone: {
      type: String,
      required: [true, 'Lütfen telefon numarası giriniz!'],
    },
    province: {
      type: String,
      required: [true, 'Lütfen il bilgisini giriniz!'],
    },
    district: {
      type: String,
      required: [true, 'Lütfen ilçe bilgisini giriniz!'],
    },
    neighbourhood: {
      type: String,
      required: [true, 'Lütfen mahalle bilgisini giriniz!'],
    },
    fullAddress: {
      type: String,
      required: [true, 'Lütfen açık adres bilgisini giriniz!'],
    },
    title: {
      type: String,
      required: [true, 'Lütfen adres başlığı bilgisini giriniz!'],
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

module.exports = mongoose.model('Address', addressSchema)
