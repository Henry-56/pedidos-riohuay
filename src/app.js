const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser'); // Importar cookie-parser

const app = express();

// Configurar cookie-parser
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// importando rutas
const pedidoRoutes= require('./routes/pedido.js');
const carritoRoutes= require('./routes/carrito.js');
const loginRoutes= require('./routes/login');
const productosRoutes= require('./routes/productos');


// ...


// configurando body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configurando sesión




// seteando views
app.set('port',process.env.PORT|| 5000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

// rutas

app.use('/', pedidoRoutes);
app.use('/', carritoRoutes);
app.use('/', loginRoutes);
app.use('/', productosRoutes);


// archivos estáticos
app.use(express.static(path.join(__dirname,'public')));

// iniciar servidor
app.listen(app.get('port'), () => console.log(`Example app listening on port 5000`));
