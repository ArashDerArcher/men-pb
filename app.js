const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport');
const config = require('./config/database');


mongoose.connect(config.database);
let db = mongoose.connection;


// check connection
db.once('open', function(){
    console.log('Connected to MongoDB.');
});


// check for DB errors
db.on('error', function(erro){
    console.log(err);
});

// Init App
const app = express();

// bring in the models
let Aricle = require('./models/article');

// Global vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Body Parser Middleware
// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// set Public folder as Static path
app.use(express.static(path.join(__dirname, 'public')));

/*
// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
    res.locals.messages = require('express-messages')(req, res);
    next();
});
*/
// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
/*
// Passport config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});
*/

var users = [
    {
        id:1,
        first_name:'John',
        last_name:'Snow',
        email: 'jsnow@yahoo.com'
    },
    {
        id:1,
        first_name:'Bob',
        last_name:'Sponge',
        email: 'bsponge@gmail.com'
    }
]
// Home Route
app.get('/', function(req,res){
    /*Article.find({}, function(err, articles){
        if(err){
            console.log(err);
        } else {*/
            res.render('index', {
                title: "DataBase",
                users: users
            });
//        }
//    });
});

app.post('/users/add', function(req, res){
    //console.log('Form submitted!');
    //console.log(req.body.first_name);
    
    req.checkBody('first_name', 'First Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    
    var errors = req.validationErrors();

    if(errors){
        res.render('index', {
            title: "DataBase",
            users: users,
            errors: errors
        });
    } else {

    var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }
    //console.log(newUser);
    console.log('success');
}

});


/*
// Route files
let articles = require('./routes/articles');
let users = require('./routes/users');
app.use('./articles', articles);
app.use('./users', users);
*/
// Start Server
app.listen(3000, function(){
    console.log('Server started on port 3000...');
});