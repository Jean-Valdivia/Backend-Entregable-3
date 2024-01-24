const express = require('express');
const app = express();
const PUERTO = 8080;

app.use(express.urlencoded({extended:true}));

const ProductManager = require("../src/ProductManager.js")
const productManager = new ProductManager("./products.json")

app.get("/api/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();
        if (limit) {
            res.json(productos.slice(0,limit));
        } else {
            res.json(productos)
        }
    } catch (error) {
        console.log("error al obtener los productos", error);
        res.status(500).json({error: "error del servidor"});
    }
});

app.get("/api/products/:pid", async (req, res) => {
    let id = req.params.pid;

    try {
        const producto = await productManager.getProductById(parseInt(id));
        if (!producto) {
            res.json({
                error: "Producto no encontrado"
            })
        } else{
            res.json(producto);
        }
    } catch (error) {
        console.log("error al obtener el producto", error);
        res.status(500).json({error: "Error del servidor"});
    }
});


app.listen(PUERTO);