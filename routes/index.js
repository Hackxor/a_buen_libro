const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const adminController = require('../controllers/adminController');


module.exports = function(){
    // mostrando vistas de inicio
    router.get('/', bookController.home);
    router.get('/us', bookController.us);
    router.get('/books/:page',bookController.books);
    router.get('/book/:libroId', bookController.book);
    
    // mostrando vistas de admin
    router.get('/login', adminController.login);
    router.get('/admin', adminController.admin);
    router.get('/crear', adminController.crear);
    router.get('/crearExcel', adminController.crearExcelForm);
    router.get('/editar/:libroId', adminController.editar);


    // nuevos libros
    router.post('/nuevoLibro', 
    bookController.subirImagen,
    bookController.crear)

    // editar libros
    router.post('/editar/:libroId', adminController.editarLibro);
   // eliminar libros
   router.post('/eliminar/:libroId', adminController.eliminarLibro);
    // busqueda
    router.post('/busqueda', bookController.buscar);
    router.post('/busquedaCalificacion', bookController.buscarCalificacion);
    router.post('/busquedaEdad', bookController.buscarEdades);
    router.post('/busquedaEncuadernacion', bookController.buscarEncuadernacion);
    router.post('/busquedaGenero', bookController.buscarGenero);
    router.post('/busquedaIlustracion', bookController.buscarIlustracion);
    router.post('/busquedaEditorial', bookController.buscarEditorial);

    router.post('/import-excel',adminController.subirExcel, adminController.crearExcel);

    router.post('/filtrado', bookController.filtrado);
    return router;
}


