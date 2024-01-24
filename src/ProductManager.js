const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.nextProductId = 1;

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, '[]', 'utf-8');
        }
    }

    async readProductsFile() {
        const content = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(content);
    }

    async writeProductsFile(products) {
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
    }

    async addProduct(product) {
        const products = await this.readProductsFile();

        product.id = this.nextProductId++;
        products.push(product);

        await this.writeProductsFile(products);
    }

    async getProducts() {
        return await this.readProductsFile();
    }

    async getProductById(id) {
        const products = await this.readProductsFile();
        return products.find((product) => product.id === id);
    }

    async updateProduct(id, updatedProduct) {
        const products = await this.readProductsFile();

        const index = products.findIndex((product) => product.id === id);
        if (index !== -1) {
            updatedProduct.id = id;
            products[index] = updatedProduct;
            await this.writeProductsFile(products);
        }
    }

    async deleteProduct(id) {
        const products = await this.readProductsFile();

        const index = products.findIndex((product) => product.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            await this.writeProductsFile(products);
        }
    }
}

module.exports = ProductManager;