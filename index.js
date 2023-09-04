const express = require('express')
const  { mongodb } = require('./db/config')


mongodb()
const app = express();
require('dotenv').config();


// Middleware para configurar los encabezados CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173'); // Cambia esto al dominio correcto
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//Directorio publico

app.use(express.static('public'))

// Parser Body
app.use(express.json());

//Routes

app.use('/api/mongo',require('./routes/mongo'));

app.use('/api/dynamo',require('./routes/dynamo'));



//Listen
app.listen(process.env.PORT, () => {
    console.log(`Desde ${process.env.PORT}`)
})