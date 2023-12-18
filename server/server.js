const express = require('express');
const path = require('path'); // Añade esta línea
const usuarioRoutes = require('./usuarioRoutes'); // Rutas de usuario
const app = express();
const port = 3000;
const hola = 'hola';

app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/usuario/userImages', express.static(path.join(__dirname, 'userImages'))); // Añade esta línea

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de mi aplicación');
});

app.listen(port, () => {
  console.log('Servidor Node.js y Express.js en ejecución en el puerto ' + port);
});

