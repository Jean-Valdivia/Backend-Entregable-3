const fs = require('fs');

class ProductManager {
    constructor() {
    this.products = [];
    } 

    getProducts() {
    return this.products;
    }

    getProductById(pid) {
    return this.products.find((product) => product.id === pid);
    }

    addProduct(product) {
    this.products.push(product);
    }

    aveProducts() {
    const productsString = JSON.stringify(this.products);
    fs.writeFileSync('./products.json', productsString);
    }
}

module.exports = ProductManager;