const Libros = require("../models/Libros");
const fs = require('fs');
const multer = require('multer');
const xlsx = require('xlsx');
const readXlsxFile = require('read-excel-file/node');
const mysql = require('mysql2');
const {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER} = require('../config/produccion');



 const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
  })


exports.login = (req,res) =>{
    res.render('login');
}

exports.admin = async(req,res) =>{
    const books = await Libros.findAll();
    res.render('admin', {books});
}

exports.crear = (req,res) =>{
    res.render('crear');
}

exports.crearExcelForm = (req,res) =>{
    res.render('crearExcel');
}
// editar
exports.editar = async(req,res) =>{
    const books = await Libros.findByPk(req.params.libroId);
    res.render('editar', {books});
}
exports.editarLibro = async(req,res,next) =>{
    const books = await Libros.findByPk(req.params.libroId);
    // obteniendo valores
    const {isbn , titulo, autor, ilustrador , critica, ancho, alto, paginas, encuadernacion, editorial} = req.body;
    books.isbn = isbn;
    books.titulo = titulo;
    books.autor = autor;
    books.ilustrador = ilustrador;
    books.critica = critica;
    books.ancho = ancho;
    books.alto = alto;
    books.paginas = paginas;
    books.encuadernacion = encuadernacion;
    books.editorial = editorial;

    if (!books) {
        
        res.redirect('/admin');
        next();
    }

    await books.save();
    res.redirect('/admin');

}

exports.eliminarLibro = async(req,res,next) =>{
    const books = await Libros.findByPk(req.params.libroId);
    // obteniendo valores
  
    if (!books.portada) {
        const imagen = __dirname + `/../public/uploads/${books.portada}`;
        fs.unlink(imagen, (error) =>{
            if (error) {
                
            }
            return;
        })
    }

    await Libros.destroy({where : {id : req.params.libroId}});
    res.redirect('/admin');

}


// crear excel

// configuracion

const configuracionMulter ={
    storage : fileStorage = multer.diskStorage({
        destination : (req,file,next) =>{
            next(null, __dirname + '/public/files/');
        },
        filename : (req,file,next) =>{
            next(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
        }      
      }) 
    }

  const uploadFile = multer( configuracionMulter).single('import-excel');


exports.crearExcel = async(req,res) =>{
    
    importFileToDb(__dirname + '/../public/files/' + req.file.filename);
    console.log(res)
    res.redirect('/admin');

 }





  exports.subirExcel = async(req,res,next) =>{

    uploadFile(req,res, function(error){
         if (error) {
             // mFnejar errores
             console.log(error);
         }else{
             next();
         }

        
    })


 }




 function importFileToDb(exFile) {
    readXlsxFile(exFile).then((rows) => {
      rows.shift()
      db.connect((error) => {
        if (error) {
          console.error(error)
        } else {

         
          let query = "INSERT INTO libros (time,titulo,isbn,autor1,editorial,año,ancho,alto,pags,encuadernacion,coleccion,edades,editor1,formato,editor2,autor2,ilustraciones,ilustrador,genero,subgenero,repetuoso,armonioso,entretenido,bienescrito,creible,iluminador,legible,ejemplos,descripciones,mejoras,calificacion,reseña,revision,reseñador,palabras,cita,foto1,foto2,foto3,foto4,rrss) VALUES ?"
          db.query(query, [rows], (error, response) => {
            console.log(error || response)
          })

          


        }
      })
    })
  }


// leer excel

    