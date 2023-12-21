    const express = require('express');
    // dependecies swagger
    const swaggerJSON = require('./openapi.json')
    const swaggerUI = require('swagger-ui-express')
    //  modul Morgan
    const morgan = require('morgan'); 
    
    
    const path = require('path');

    const app = express();
    const port = 4000;
    const userRouter = require('./api/User'); 
    const authRouter = require('./api/auth');

    app.use(express.json());
    // Gunakan Morgan sebagai middleware untuk logging
    app.use(morgan('combined'));
    // router untuk masing-masing api
    app.use('/user', userRouter); 
    // router auth
    app.use('/auth', authRouter);
    //router dokumentasi swagger
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))


    const session = require('express-session');


    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(session({
      secret: 'secret-key', // Buat Secret key 
      resave: false,
      saveUninitialized: true,
    }));


    app.set('view engine', 'ejs'); // Mengatur EJS sebagai view engine
    app.set('views', __dirname + '/views'); // Menentukan direktori views

    // Import router.js untuk handle register,login,reset password
    const routerView = require('./views/router');
    // Gunakan rute router.js
    app.use('/views/router', routerView);

    
    //Rute Menu Utama
    app.get('/', (req, res) => {
      res.render('index');
    });


    // Menetapkan middleware express.static
    app.use(express.static(path.join(__dirname, 'public')));
    


    
    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });