const mysql = require('mysql');

// Configura la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'workoutsync'
});

// Conecta con la base de datos MySQL
connection.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida con éxito.');
});

module.exports = connection;