

const Pedidos = require('../models/Pedidos');

//Agregar un pedido 
exports.nuevoPedido = async(req,res,next) => {
    const pedido = new Pedidos(req.body);
    try{
        await pedido.save();
        res.json({mensaje: "Se agrego un pedido!"});
    }catch(err){
        console.log(err);
        next();
    }
}

//Mostrar todos los pedidos
exports.mostrarPedidos = async(req,res,next) => {
    try{
        const pedido = await Pedidos.find({}).populate('cliente')
        .populate({
            path: "pedido.producto",
            model: "Productos"
        });
        res.json({pedido});
    }catch(err){
        console.log(err);
        next();
    }
}

//Mostrar pedido por [ID]
exports.mostrarPedido = async(req,res,next) => {
    try{
        const pedido = await Pedidos.find({_id: req.params.idPedido})
        .populate('cliente')
        .populate({
            path: "pedido.producto",
            model: "Productos"
        });
        res.json({pedido});
    }catch(err){
        console.log(err);
        next();
    }
}

//Actulizar por [ID]
exports.actulizarPedido = async(req,res,next) => {
    try{
        const pedido = await Pedidos.findByIdAndUpdate({_id: req.params.idPedido}, req.body, {new:true})
        .populate('cliente')
        .populate({
            path: "pedido.producto",
            model: "Productos"
        });
        res.json({pedido});
    }catch(err){
        console.log(err);
        next();
    }
}

//Mostrar pedido por [ID]
exports.eliminarPedido = async(req,res,next) => {
    try{
        await Pedidos.findByIdAndDelete({_id: req.params.idPedido});
        res.json({mensaje: "Pedido eliminado"});
    }catch(err){
        console.log(err);
        next();
    }
}