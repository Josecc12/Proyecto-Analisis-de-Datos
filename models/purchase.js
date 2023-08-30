const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  payment_method: String,
  card_type: String,
  product_name: String,
  brand: String,
  price: Number,
  purchase_amount: Number,
  category: String,
  shipping_address: String,
  color: String,
  city: String,
  material: String,
  country: String,
  gender: String,
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
