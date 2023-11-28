const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();

const productManager = new ProductManager('./products.json')

app.use(express.json());

app.get('/products', async (req, res) => {
    const productos = await productManager.getProducts();
    res.json(productos);
});

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const producto = await productManager.getProductById(pid);

    if (!producto) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
    }
    res.json(producto);
});

app.listen(8080, ()=>{
    console.log("corriendo en 8080")
});