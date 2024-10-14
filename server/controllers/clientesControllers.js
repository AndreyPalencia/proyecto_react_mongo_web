const Clientes = require('../models/Clientes')

//Agregar un nuevo cliente

exports.nuevoCliente = async (req, res) => {
    const cliente = new Clientes(req.body)
    try {
        //Almacenamiento de los datos
        await cliente.save();
        res.json({ mesaje: 'Se agrego un nuevo Cliente.' })
    } catch (err) {
        console.log(err);
        res.json({ error: 'Ha ocurrido un error.' })
    }
}

//Obtener un cliente en especifico por su ID

exports.obtenerCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findById(req.params.idCliente);
        if (!cliente) {
            res.json({ mensaje: 'El cliente no existe.' });
            next()
        }
        res.json(cliente);
    } catch (err) {
        console.log(err)
        res.json({error :'Los datos de busqueda no validos'});
    }
}

//Obtener todos los clientes

exports.obtenerTodosCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.find({});
        if (!cliente) {
            res.json({ mensaje: 'No se encuantran resgistro en BD.' });
            next()
        }
        res.json(cliente);
    } catch (err) {
        console.log(err)
        res.json({error :'Los datos de busqueda no validos'});
    }
}

//Actualizar el cliente por su [ID]

exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findByIdAndUpdate({ _id: req.params.idCliente }, req.body, { new: true });
        res.json(cliente)
    } catch (err) {
        console.log(err)
        next();
    }
}

//Delete el cliente por su [ID]

exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.findByIdAndDelete({ _id: req.params.idCliente });
        res.json({mensaje : 'El usuario ha sido eliminado'})
    } catch (err) {
        console.log(err)
        next();
    }
}