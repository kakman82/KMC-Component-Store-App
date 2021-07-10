const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const addressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  companyName: {
    type: String,
    required: [true, 'Lütfen şirketinizin adını giriniz!'],
  },
  phone: {
    type: Number,
    required: [true, 'Lütfen telefon numaranızı giriniz!'],
  },
  city: String,
  state: String,
  street: String,
  fullAddress: String,
  description: String,
});

module.exports = mongoose.model('Address', addressSchema);
