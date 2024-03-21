const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8080;


app.use(express.json());

// Rutas para productos
const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
    
    res.send('Listado de todos los productos');
});

productsRouter.get('/:pid', (req, res) => {
    
    res.send('Detalle de un producto');
});

productsRouter.post('/', (req, res) => {
   
    res.send('Agregar un nuevo producto');
});

productsRouter.put('/:pid', (req, res) => {
  
    res.send('Actualizar un producto');
});

productsRouter.delete('/:pid', (req, res) => {
    
    res.send('Eliminar un producto');
});


const cartsRouter = express.Router();

cartsRouter.post('/', (req, res) => {
  
    res.send('Crear un nuevo carrito');
});

cartsRouter.get('/:cid', (req, res) => {

    res.send('Productos de un carrito');
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
   
    res.send('Agregar un producto a un carrito');
});


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});