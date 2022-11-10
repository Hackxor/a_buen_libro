const Libros = require("../models/Libros");
const multer = require('multer');
const shortid = require('shortid');
const { Op, Sequelize } = require("sequelize");
const mysql = require('mysql2');
const {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER} = require('../config/produccion');



 const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
  })




const configuracionMulter ={
        storage : fileStorage = multer.diskStorage({
            destination : (req,file,next) =>{
                next(null, __dirname + '/../public/uploads/');
            },
            filename : (req,file,next) =>{
                const extension = file.mimetype.split('/')[1];
                next(null, `${shortid.generate()}.${extension}`);
            }      
          })
}
const upload1 = multer(configuracionMulter).single('portada');


exports.home = async(req,res) =>{
    res.render('home',);
}

exports.us = (req,res) =>{
    res.render('us');
}

exports.books = async(req,res) =>{

    let limit = 9;   // number of records per page
    let offset = 2;
   await Libros.findAndCountAll()
    .then((data) => {
      let page = req.params.page;      // page number
      let pages = Math.ceil(data.count / limit);
          offset = limit * (page - 1);

        Libros.findAll({
        attributes: ['id','titulo','calificacion','autor1','reseña','foto1'],
        limit: limit,
        offset: offset
      })
      
      .then((books) => {


        Libros.findAll({
       attributes: ['calificacion'],
      group : ['calificacion'],
     }).then((calif) =>{
        
        Libros.findAll({
            attributes: ['encuadernacion'],
           group : ['encuadernacion'],
          }).then((encua) =>{
             
            Libros.findAll({
                attributes: ['genero'],
               group : ['genero'],
              }).then((gene) =>{
                 
                Libros.findAll({
                    attributes: ['ilustraciones'],
                   group : ['ilustraciones'],
                  }).then((ilust) =>{
                     
                    Libros.findAll({
                        attributes: ['editorial'],
                       group : ['editorial'],
                      }).then((edit) =>{
                         
                       
                  
                        Libros.findAll({
                            attributes: ['palabras'],
                           group : ['palabras'],
                          }).then((claves) =>{


      let edades2 = "SELECT  edades,palabras FROM libros ORDER BY 'ASC'";
                       
                        
                        db.query(edades2, (error, response) => {
                           let edad = JSON.parse(JSON.stringify(response));
                           let edades3 = edad[0].edades.split(',');

                           let array = JSON.parse(JSON.stringify(claves));
let palabras1 = array[0].palabras.split(',');



res.render('books', {palabras1
,edades3,edit,calif,encua,gene,ilust,books,data,page});                             

                            })
                           
                             
                        })
                        
                           
                                                                                                                          
                                                   
                             
                       
    

                          
                         
                          
                      })
                     
                     
                  })
                 
                 
              })
             
          })
        
     })
     
    
     

        
      });
    })
    .catch(function (error) {
          res.status(500).send('Internal Server Error');
      });
 
     
}

exports.book = async(req,res) =>{
    const books = await Libros.findByPk(req.params.libroId);
    let palabras1 = books.palabras.split(',')
    let edades1 = books.edades.split(',')
    res.render('book',{books,palabras1,edades1});
}

// almacenar libros en la db
exports.crear = async(req,res) =>{
   const libro = req.body;
//    leer imagen
    libro.portada = req.file.filename;

   try {
    // almacenar
    await Libros.create(libro);
    res.redirect('/admin');
    
   } catch (error) {
    console.log(error);
   }
}

// almacenar libros en la db
exports.subirImagen = async(req,res,next) =>{

   upload1(req,res, function(error){
        if (error) {
            // manejar errores
            console.log(error);
        }else{
            next();
        }
   })



 }
 
//  buscar 
exports.buscar = async(req,res) =>{
    const books = await Libros.findAll({where :{titulo : req.body.search}  });
    
    res.render('books2',{books});
}
exports.buscarCalificacion = async(req,res) =>{
   
    const books = await Libros.findAll({where :{calificacion : req.body.searchCalificacion}  });
    
    res.render('books2',{books});
}
exports.buscarEncuadernacion = async(req,res) =>{
   
    const books = await Libros.findAll({where :{encuadernacion : req.body.searchEncuadernacion}  });
    
    res.render('books2',{books});
}
exports.buscarGenero = async(req,res) =>{
   
    const books = await Libros.findAll({where :
        { [Op.or]:
            [{calificacion : [req.body.searchCalificacion]},
        
           {encuadernacion : [req.body.searchEncuadernacion]},       
        
           {genero : [req.body.searchGenero]},

           {ilustracion : [req.body.searchIlustracion]},

           {editorial : [req.body.searchEditorial]},
           {titulo : [req.body.searchTitulo]},
           {cl1 : [req.body.searchCl1]},{cl2 : [req.body.searchCl2]},{cl3 : [req.body.searchCl3]},{cl4 : [req.body.searchCl4]},
           {cl5 : [req.body.searchCl5]},{cl6 : [req.body.searchCl6]},{cl7 : [req.body.searchCl7]},{cl8 : [req.body.searchCl8]},
           {cl9 : [req.body.searchCl9]},{cl10 : [req.body.searchCl10]},{cl11 : [req.body.searchCl11]},{cl12 : [req.body.searchCl12]},

           {año : [req.body.searchAño]},

           

        
        
            ]
        }  
        
    
    
    });
    
    res.render('books2',{books});
}

exports.buscarEdades = async(req,res) =>{
   
    const books = await Libros.findAll({where :
        { [Op.or]:
            [{edad : [req.body.searchEdad1,req.body.searchEdad2,req.body.searchEdad3,req.body.searchEdad4,req.body.searchEdad5,req.body.searchEdad6,req.body.searchEdad7,req.body.searchEdad8]},
        
           {encuadernacion : [req.body.searchEdad2]},       

        
        
            ]
        }  
        
    
    
    });
    
    res.render('books2',{books});
}


exports.buscarIlustracion = async(req,res) =>{
   
    const books = await Libros.findAll({where :{ilustracion : req.body.searchIlustracion}  });
    
    res.render('books',{books});
}
exports.buscarEditorial = async(req,res) =>{
   
    const books = await Libros.findAll({where :{editorial : req.body.searchEditorial}  });
    
    res.render('books',{books});
}




exports.filtrado = async(req,res) =>{
   
    const books = await Libros.findAll(
        {
            where :
        { 
            
            
            [Op.or]:
            [{calificacion : [req.body.searchCalificacion1, req.body.searchCalificacion2,req.body.searchCalificacion3, req.body.searchCalificacion4, req.body.search]},

            {titulo : [req.body.search]},
            {autor1 : { [Op.like]: `%${req.body.search}%` }},
            {autor2 : { [Op.like]: `%${req.body.search}%` }},
            {ilustrador : { [Op.like]: `%${req.body.search}%` }},
            {editor1 : { [Op.like]: `%${req.body.search}%` }},
            {editor2 : { [Op.like]: `%${req.body.search}%` }},
        
           {encuadernacion : [req.body.search,req.body.searchEncuadernacion5, req.body.searchEncuadernacion6,req.body.searchEncuadernacion7, req.body.searchEncuadernacion8]},       
        
           {genero : [req.body.search,req.body.searchGenero1, req.body.searchGenero2,req.body.searchGenero3, req.body.searchGenero4]},

           {ilustraciones : [req.body.search,req.body.searchIlustracion1, req.body.searchIlustracion2,req.body.searchIlustracion3]},

           {editorial : [req.body.search,req.body.searchEditorial1, req.body.searchEditorial2,req.body.searchEditorial3,req.body.searchEditorial4,req.body.searchEditorial5]},

           {año : [req.body.search,req.body.searchAño1, req.body.searchAño2]},

           {edades : [req.body.search,req.body.searchEdad1, req.body.searchEdad2,req.body.searchEdad3,req.body.searchEdad4,req.body.searchEdad5,req.body.searchEdad6,req.body.searchEdad7,req.body.searchEdad8]},

           {palabras : [req.body.search,req.body.buscarCl1, req.body.searchCl2,req.body.searchCl3,req.body.searchCl4,req.body.searchCl5,req.body.searchCl6,req.body.searchCl7,req.body.searchCl9]},

           {reseña: { [Op.like]: `%${req.body.search}%` }},
           
            ]

            

        
        }  

    });

    const calificacion = await Libros.findAll({ attributes:['calificacion'], group:['calificacion'] });
    const editorial = await Libros.findAll({attributes:['editorial'], group:['editorial']});
    const genero = await Libros.findAll({attributes:['genero'], group:['genero']});
    const encuadernacion = await Libros.findAll({ attributes:['encuadernacion'], group:['encuadernacion'] });
    const ilustracion = await Libros.findAll({attributes:['ilustraciones'], group:['ilustraciones']});

    let edades2 = "SELECT edades FROM libros";
     db.query(edades2, (error, response) => {
        let edad = JSON.parse(JSON.stringify(response));
        let edades3 = edad[0].edades.split(',');
        res.render('books2',{books,calificacion,editorial,genero,encuadernacion,ilustracion,edades3});

      })



   
}
