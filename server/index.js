const express = require('express');
const routes = require('./routes/index.js');
const moongoose = require('mongoose');
const bodyParse = require('body-parser')
//Creamos el sevidor
const app = express();

//Configurar MongoDB
const connectDB = async () => {
    try {
        await moongoose.connect('mongodb://localhost:27017/restapis');
        console.log('Conexión exitosa a MongoDB');
    } catch (err) {
        console.log('Error al conectarse a MongoDB', err);
    }
}
//Conectar MongoDB
connectDB()

//Habilitar Body-Parser
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:true}))

//Agregamos las rutas
app.use('/', routes());

//Puerto del servidor
const PORT = 3000

app.listen(PORT);