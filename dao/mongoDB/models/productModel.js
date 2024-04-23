const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Definir la estructura del documento para la colección products
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;