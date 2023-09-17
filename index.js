const express = require('express')
const  { mongodb } = require('./db/config')


mongodb()
const app = express();
require('dotenv').config();


// Middleware para configurar los encabezados CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update to match your frontend origin
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


app.use('/api/mysql',require('./routes/mysql'))



//Listen
app.listen(process.env.PORT, () => {
    console.log(`Desde ${process.env.PORT}`)
})