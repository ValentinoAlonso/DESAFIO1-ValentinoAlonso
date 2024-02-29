const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        try {
            const products = await this.getProducts();
            const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            product.id = newId;
            products.push(product);
            await this.saveProducts(products);
            return product;
        } catch (error) {
            throw new Error('Error al agregar el producto: ' + error.message);
        }
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
        
            if (error.code === 'ENOENT' || error.code === 'ERR_EMPTY_FILE') {
                return [];
            } else {
                throw new Error('Error al leer el archivo de productos: ' + error.message);
            }
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            return products.find(product => product.id === id);
        } catch (error) {
            throw new Error('Error al obtener el producto por ID: ' + error.message);
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            let products = await this.getProducts();
            const index = products.findIndex(product => product.id === id);
            if (index !== -1) {
                updatedProduct.id = id;
                products[index] = updatedProduct;
                await this.saveProducts(products);
                return updatedProduct;
            } else {
                throw new Error('Producto no encontrado');
            }
        } catch (error) {
            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.getProducts();
            products = products.filter(product => product.id !== id);
            await this.saveProducts(products);
        } catch (error) {
            throw new Error('Error al eliminar el producto: ' + error.message);
        }
    }

    async saveProducts(products) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            throw new Error('Error al guardar los productos: ' + error.message);
        }
    }
}

module.exports = ProductManager;