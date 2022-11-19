const{ Router }= require('express');

const{crearDocumento,getTareas, escribir} = require('../controller/tareasController');

const router = Router();

router.post('/crearDocumento',crearDocumento);
router.post('/crearFichero',escribir);
router.get('/getProcesos',getTareas);
//console.log();

module.exports = router