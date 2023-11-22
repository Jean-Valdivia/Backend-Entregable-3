const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();

const productManagerInstance = new ProductManager('./productos.json'); // Crea una instancia de la clase ProductManager

app.use(express.json()); // Analiza los datos JSON en el cuerpo de la solicitud

app.get('/productos', async (req, res) => {
    try {
    const productos = await productManagerInstance.getProducts();
    res.send(productos);
    } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).send('Error al recuperar los productos');
    }
});

app.get('/productos/:pid', async (req, res) => {
    const pid = req.params.pid;

    try {
    const producto = await productManagerInstance.getProductById(pid);
    res.send(producto);
    } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(404).send('Producto no encontrado');
    }
});

app.post('/productos', async (req, res) => {
    const nuevoProducto = req.body;

    try {
    await productManagerInstance.addProduct(nuevoProducto);
    res.status(201).send('Producto creado correctamente');
    } catch (error) {
    console.error('Error al agregar el producto:', error);
    res.status(500).send('Error al crear el producto');
    }
});

app.put('/productos/:pid', async (req, res) => {
    const pid = req.params.pid;
    const productoActualizado = req.body;

    try {
    await productManagerInstance.updateProduct(pid, productoActualizado);
    res.status(200).send('Producto actualizado correctamente');
    } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(404).send('Producto no encontrado');
    }
});

app.delete('/productos/:pid', async (req, res) => {
    const pid = req.params.pid;

    try {
    await productManagerInstance.deleteProduct(pid);
    res.status(204).send('Producto eliminado correctamente');
    } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(404).send('Producto no encontrado');
    }
});

app.listen(3000);