const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  // Definir la estructura del documento para la colección carts
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;