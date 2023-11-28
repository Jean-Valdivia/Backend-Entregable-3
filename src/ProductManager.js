const fs = require("fs");

class ProductManager {
  constructor() {
    this.loadProducts();
    this.products = [];
  }

  loadProducts() {
    const jsonString = fs.readFileSync('./products.json');
    const productos = JSON.parse(jsonString);
    this.products = productos;
  }

  getProducts() {
    return this.products;
  }

  getProductById(pid) {
    return this.products.find((producto) => producto.id === pid);
  }

  addProduct(product) {
    this.products.push(product);
  }

  saveProducts() {
    const productsString = JSON.stringify(this.products);
    fs.writeFileSync("./products.json", productsString);
  }
}

module.exports = ProductManager;
