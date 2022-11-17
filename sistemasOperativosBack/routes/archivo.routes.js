const{ Router }= require('express');

const{crearDocumento,getTareas} = require('../controller/tareasController');

const router = Router();

router.post('/crearDocumento',crearDocumento);
router.get('/getProcesos',getTareas);
console.log();

module.exports = router