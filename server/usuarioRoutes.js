const express = require('express');
const router = express.Router();
const multer = require('multer');
const conexion = require('./conexion');
const bodyParser = require('body-parser');

router.use(bodyParser.json()); // Asegúrate de que esto se ejecuta antes de tus rutas



// Configuración de multer para almacenar archivos en el sistema de archivos
const storage = multer.diskStorage({
    destination: './userImages',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Usa el timestamp como nombre del archivo
    },
});

const upload = multer({ storage: storage });

// Crear un nuevo usuario
router.post('/createNewUser', upload.single('selectedImage'), (req, res) => {
    const imagePath = req.file.path;
    console.log('Datos del formulario recibidos:', req.body);
    console.log('Archivo de imagen recibido:', req.file);

    const { username, password, email, name, description, altura, peso, sliderValue, date } = req.body;

    conexion.query(
        'CALL manageUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [username, password, email, name, description, req.file.filename, imagePath, altura, peso, sliderValue, date],
        (err, results) => {
            if (err) {
                console.error('Error al crear usuario:', err);
                res.status(500).json({ error: 'Ocurrió un error al crear el usuario' });
            } else {
                res.json({ message: 'Usuario creado correctamente.', results });
            }
        }
    );
});

// Crear un nuevo profesional
router.post('/createNewProfesional', upload.single('selectedImage'), (req, res) => {
    const imagePath = req.file.path;
    console.log('Datos del formulario recibidos:', req.body);
    console.log('Archivo de imagen recibido:', req.file);


    const { username, password, email, name, description } = req.body;

    conexion.query(
        'CALL manageProfesional(?, ?, ?, ?, ?, ?, ?)',
        [username, password, email, name, description, req.file.filename, imagePath],
        (err, results) => {
            if (err) {
                console.error('Error al crear profesional:', err);
                res.status(500).json({ error: 'Ocurrió un error al crear el profesional' });
            } else {
                res.json({ message: 'Profesional creado correctamente.', results });
            }
        }
    );
});

router.post('/login', (req, res) => {
    const { loginUsername, loginPassword } = req.body;

    conexion.query('CALL ValidateLogin(?, ?)', [loginUsername, loginPassword], (err, results) => {
        if (err) {
            console.error('Error al validar el inicio de sesión:', err);
            res.status(500).json({ error: 'Ocurrió un error al validar el inicio de sesión' });
        } else if (results[0].length > 0) {
            // Incluye los datos del usuario en la respuesta
            console.log(results[0][0])
            res.json({
                success: true,
                message: 'Inicio de sesión exitoso.',
                user: results[0][0] // Esto corresponde a los datos del usuario
            });
        } else {
            res.json({ success: false, message: 'Usuario no encontrado o contraseña incorrecta.' });
        }
    });
});




module.exports = router;