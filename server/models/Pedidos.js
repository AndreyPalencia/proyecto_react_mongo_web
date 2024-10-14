const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidosSchema = Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: "Clientes",
    }, 
    producto: [{
        producto: {
            type: Schema.ObjectId,
            ref: "Productos"
        },
        cantidad: Number
    }], 
    total: {
        type: Number
    }
});

module.exports = mongoose.model('Pedidos', pedidosSchema)