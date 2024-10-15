const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesControllers');
const productosController = require('../controllers/productosControllers');
const pedidosController = require('../controllers/pedidosControllers');


module.exports = function () {
    /* Clientes */

    //Agregar un nuevo cliente
    router.post('/cliente/create', clientesController.nuevoCliente);
    //Buscar un clientes por [ID]
    router.get('/clientes/:idCliente', clientesController.obtenerCliente);
    //Trae todos lo usuarios
    router.get('/clientes', clientesController.obtenerTodosCliente);
    //Actualizar un cliente
    router.put('/cliente/update/:idCliente', clientesController.actualizarCliente);
    //Eliminar un Cliente
    router.delete('/cliente/delete/:idCliente', clientesController.eliminarCliente);

    /* Productos */

    //Agregar un nuevo producto
    router.post('/productos', productosController.subirArchivo, productosController.nuevoProducto);
    //Mostrar productos 
    router.get('/productos/all', productosController.mostarProductos);
    //Mostrar producto por [ID]
    router.get('/productos/:idProducto', productosController.mostarProducto);
    //Actualizar producto por [ID]
    router.put('/productos/:idProducto', productosController.subirArchivo, productosController.actualizarProducto);
    //Eliminar un producto por [ID]
    router.delete('/productos/:idProducto', productosController.eleminarProducto);

    /* Pedidos */
    //Agregar un nuevo Pedido
    router.post('/pedidos', pedidosController.nuevoPedido);
    //Mostrar los pedidos 
    router.get('/pedidos', pedidosController.mostrarPedidos);
    //Mostrar pedido por [ID]
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);
    //Actualizar pedido por [ID]
    router.put('/pedidos/:idPedido', pedidosController.actulizarPedido);
    //Eliminar un pedido por [ID]
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);
    return router;
}