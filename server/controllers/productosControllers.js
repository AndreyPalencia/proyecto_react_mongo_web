const ProductosSena = require('../models/Productos');
const multer = require('multer');

let nanoid;

(async () => {
    nanoid = (await import('nanoid')).nanoid;
})();

const configuracionMulter = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${nanoid()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'));
        }
    },
};

// Pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

//Subir el archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next();
    });
}

exports.nuevoProducto = async (req, res, next) => {
    const producto = new ProductosSena(req.body);
    try {
        if (req.file.filename) {
            producto.imagen = req.file.filename;
        }
        await producto.save();
        res.json({ mensaje: 'Se agrego un producto correctamente' });
    } catch (err) {
        console.log(err);
        next();
    }
}

//Mostrar todos los productos 
exports.mostarProductos = async (req, res, next) => {
    try {
        const productos = await ProductosSena.find({});
        res.json(productos);
    } catch (err) {
        console.log(err);
        next();
    }
}

//Mostar un productos por [ID]
exports.mostarProducto = async (req, res, next) => {
    const producto = await ProductosSena.findById(req.params.idProducto);
    if (!producto) {
        res.json({ mensaje: "No se encontro el producto solicitado." })
    }
    res.json(producto)
    next();
}

//Actualizar un producto por [ID]
exports.actualizarProducto = async (req,res,next) => {
    try{
        let nuevoProducto = req.body;
        //Verificar si tiene una nueva imagen
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        }else{
            let productoAnterior = await ProductosSena.findById(Req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await ProductosSena.findOneAndUpdate({_id: req.params.idProducto}, nuevoProducto, { new: true});
        res.json(producto);
    }catch(err){
        console.log(err);
        next();
    }
}

//Eliminar un producto
exports.eleminarProducto = async(req,res,next) => {
    try{
        await ProductosSena.findByIdAndDelete({_id: req.params.idProducto});
        res.json({mensaje: "El producto ha sido elimnado"}) 
    }catch(err){
        console.log(err);
        next();
    }
}