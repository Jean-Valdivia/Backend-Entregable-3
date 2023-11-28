const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();

const productManagerInstance = new ProductManager('./products.json')

app.use(express.json());

app.get('/products', async (req, res) => {
    try {
    const productos = await productManagerInstance.getProducts();
    res.send(productos);
    console.error('los productos:')
    } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).send('Error al recuperar los productos');
    }
});

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;

    try {
    const producto = await productManagerInstance.getProductById(pid);
    res.send(producto);
    } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(404).send('Producto no encontrado');
    }
});

app.listen(8080, ()=>{
    console.log("corriendo en 8080")
});