const Sequelize = require('sequelize');
const db = require('../config/db');


const Libros = db.define('libros', {
    id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    }, 
    titulo: {
        type: Sequelize.TEXT,
      
    },
    isbn: {
        type: Sequelize.TEXT, 
       
    }, 
    autor1: {
        type: Sequelize.TEXT,
    },
    año: {
        type: Sequelize.TEXT,
       
    },
    reseña: {
        type: Sequelize.TEXT,
    },
    ancho: {
        type: Sequelize.INTEGER(2),
    },
    alto: {
        type: Sequelize.INTEGER(2),
    },
    pags: {
        type: Sequelize.INTEGER(3),
    },
    encuadernacion: {
        type: Sequelize.TEXT,
    },
    editorial: {
        type: Sequelize.TEXT,
    },
    ilustrador: {
        type: Sequelize.TEXT,
    },
    genero: {
        type: Sequelize.TEXT,
    },
    ilustraciones: {
        type: Sequelize.TEXT,
    },
    calificacion: {
        type: Sequelize.TEXT,
    },
    edades: {
        type: Sequelize.TEXT,
    },
  
    ilustrador: {
        type: Sequelize.TEXT,
    },
    editor1: {
        type: Sequelize.TEXT,
    },
    editor2: {
        type: Sequelize.TEXT,
    },
 

 




    palabras: {
        type: Sequelize.TEXT,
    },

    foto1: Sequelize.TEXT,
    foto2: Sequelize.TEXT,
    foto3: Sequelize.TEXT,
    foto4: Sequelize.TEXT
  
})

module.exports = Libros;