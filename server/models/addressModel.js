const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const addressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  city: String,
  state: String,
  street: String,
  fullAddress: String,
  description: String,
});

module.exports = mongoose.Model('Address', addressSchema);
