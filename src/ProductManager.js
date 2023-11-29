const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async getProducts() {
        const productsJSON = await fs.promises.readFile(this.path, "utf-8");
        this.products = JSON.parse(productsJSON);
        return this.products;
    }
    
    async getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    }

}

module.exports = ProductManager;