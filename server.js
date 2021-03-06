

var mongoose = require( 'mongoose');
var engine = require('ejs-locals')
var express = require('express');
var routes = require('./routes');
var admin = require('./routes/admin');
var http = require('http');
var path = require('path');
var passport = require('passport');
var flash    = require('connect-flash');
var configDB = require('./config/db.js');
require('./config/passport')(passport)


/**
 *  Define the sample application.
 */
var MundoGamerApp = function() {

    //  Scope.
    var self = this;
    self.app = express();


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress      = process.env.OPENSHIFT_NODEJS_IP;
        self.port           = process.env.OPENSHIFT_NODEJS_PORT || 8080;
        self.engine         = "ejs";
        self.viewEngine     = "ejs";
        self.expireStatic   = 86400000;
        self.sessionPass    = "MUNDO@GAMER#COOKIE!PARSER$123";
        self.publicDir      = "public";
        self.viewDir        = "views";

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
            self.app.set('env','development');
        };
    };   

    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {

        //self.app.get('/', routes.embreve);

        self.app.get('/updateAll', routes.convertAll);      

        self.app.get('/', routes.index);

        self.app.get('/save', routes.save);

        self.app.get('/contato', routes.contato);

        self.app.post('/contato', routes.contatoEmail);

        self.app.get('/sobre', routes.sobre);

        self.app.get('/aplicativos', routes.aplicativos);

        self.app.get('/queroserparceiro', routes.queroserparceiro);

        self.app.get('/login', routes.login);

        //self.app.get('/plataforma', routes.plataforma);

        self.app.get('/jogos', routes.jogos);

        self.app.get('/wikigamer/jogos', routes.jogos);

        self.app.get('/jogos/:id?', routes.jogo);

        self.app.post('/jogos/views', routes.countViewsJogos);


        self.app.get('/parceiros', routes.parceiros);

        self.app.get('/wikigamer/parceiros', routes.parceiros);

        self.app.get('/parceiros/:id?', routes.parceiro);

        self.app.post('/parceiros/views', routes.countViewsParceiros);


        self.app.get('/wikigamer/plataformas', routes.plataformas);

        self.app.get('/plataformas', routes.plataformas);

        self.app.get('/plataformas/:id?', routes.plataforma);

        self.app.post('/plataformas/views', routes.countViewsPlataformas);


        self.app.get('/wikigamer/personagens', routes.personagens);

        self.app.get('/personagens', routes.personagens);

        self.app.get('/personagens/:id?', routes.personagem);

        self.app.post('/personagens/views', routes.countViewsPersonagens);


        // self.app.get('/coberturas', routes.coberturas);

        // self.app.get('/wikigamer/coberturas', routes.coberturas);

        // self.app.get('/coberturas/:id?', routes.cobertura);

        // self.app.post('/coberturas/views', routes.countViewsCoberturas);


        self.app.get('/wikigamer', routes.wikigamer);


        self.app.get('/noticia/:id?', routes.noticia);

        self.app.post('/noticia/count', routes.countNoticia);
        
        self.app.post('/noticia/views', routes.countViews);
        

        self.app.get('/load/:start?', routes.load);

        self.app.get('/mg-admin', admin.isLoggedIn, admin.index);

        // self.app.get('/mg-admin/login', admin.isLoggedIn, admin.login);

        self.app.get('/mg-admin/editarnoticia/:id?', admin.isLoggedIn, admin.editarNoticia);

        self.app.post('/mg-admin/editarnoticia/:id?', admin.isLoggedIn, admin.saveEditarNoticia);

        self.app.post('/mg-admin/login', passport.authenticate('local-login', {
                successRedirect : '/mg-admin', // redirect to the secure profile section
                failureRedirect : '/login', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
        }));

        self.app.get('/mg-admin/users',  admin.isLoggedIn, admin.users);

        self.app.get('/mg-admin/sitemap',  admin.isLoggedIn, admin.sitemap);

        self.app.get('/mg-admin/ajuda',  admin.isLoggedIn, admin.ajuda);

        self.app.get('/mg-admin/users/add',  admin.isLoggedIn, admin.signup);

        self.app.get('/mg-admin/users/edit/:id',  admin.isLoggedIn, admin.editUser);
        self.app.post('/mg-admin/users/edit',  admin.isLoggedIn, admin.editSaveUser);

       //process the signup form
        self.app.post('/mg-admin/users/add',  admin.isLoggedIn, passport.authenticate('local-signup', {
                successRedirect : '/mg-admin/users/add', // redirect to the secure profile section
                failureRedirect : '/mg-admin/users/add', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
        }));

        //self.app.get('/mg-admin/signup', admin.signup);

        // process the signup form
        // self.app.post('/mg-admin/signup', passport.authenticate('local-signup', {
        //         successRedirect : '/mg-admin', // redirect to the secure profile section
        //         failureRedirect : '/mg-admin/signup', // redirect back to the signup page if there is an error
        //         failureFlash : true // allow flash messages
        // }));


        //Configurações de conta

        self.app.get('/mg-admin/minhaconta/:id?', admin.isLoggedIn, admin.editarMinhaConta);

        self.app.post('/mg-admin/minhaconta/:id?', admin.isLoggedIn, admin.saveEditarMinhaConta);


        //Jogos

        self.app.get('/mg-admin/cadastrarjogo', admin.isLoggedIn, admin.novoJogo);

        self.app.post('/mg-admin/cadastrarjogo', admin.isLoggedIn, admin.saveJogo);

        self.app.get('/mg-admin/editarjogo/:id?', admin.isLoggedIn, admin.editarJogo);

        self.app.post('/mg-admin/editarjogo/:id?', admin.isLoggedIn, admin.saveEditarJogo);

        self.app.get('/mg-admin/jogoscadastrados', admin.isLoggedIn, admin.jogosCadastrados);

        //Categorias

        self.app.get('/mg-admin/cadastrarcategoria', admin.isLoggedIn, admin.novaCategoria);

        self.app.post('/mg-admin/cadastrarcategoria', admin.isLoggedIn, admin.saveCategoria);

        self.app.get('/mg-admin/editarcategoria/:id?', admin.isLoggedIn, admin.editarCategoria);

        self.app.post('/mg-admin/editarcategoria/:id?', admin.isLoggedIn, admin.saveEditarCategoria);

        self.app.get('/mg-admin/categoriascadastradas', admin.isLoggedIn, admin.categoriasCadastradas);

        //Midias

        self.app.get('/mg-admin/cadastrarmidia', admin.isLoggedIn, admin.novaMidia);

        self.app.post('/mg-admin/cadastrarmidia', admin.isLoggedIn, admin.saveMidia);

        self.app.get('/mg-admin/editarmidia/:id?', admin.isLoggedIn, admin.editarMidia);

        self.app.post('/mg-admin/editarmidia/:id?', admin.isLoggedIn, admin.saveEditarMidia);

        self.app.get('/mg-admin/midiascadastradas', admin.isLoggedIn, admin.midiasCadastradas);

        // //Categorias Empresas

         self.app.get('/mg-admin/cadastrarNovaCategoriaEmpresa', admin.isLoggedIn, admin.novaCategoriaEmpresa);

         self.app.post('/mg-admin/cadastrarNovaCategoriaEmpresa', admin.isLoggedIn, admin.saveCategoriaEmpresa);

         self.app.get('/mg-admin/editarCategoriaEmpresa/:id?', admin.isLoggedIn, admin.editarCategoriaEmpresa);

         self.app.post('/mg-admin/editarCategoriaEmpresa/:id?', admin.isLoggedIn, admin.saveEditarCategoriaEmpresa);

         self.app.get('/mg-admin/categoriasEmpresasCadastradas', admin.isLoggedIn, admin.categoriasEmpresasCadastradas);


        //Plataformas

        self.app.get('/mg-admin/cadastrarplataforma', admin.isLoggedIn, admin.novaPlataforma);

        self.app.post('/mg-admin/cadastrarplataforma', admin.isLoggedIn, admin.savePlataforma);

        self.app.get('/mg-admin/editarplataforma/:id?', admin.isLoggedIn, admin.editarPlataforma);

        self.app.post('/mg-admin/editarplataforma/:id?', admin.isLoggedIn, admin.saveEditarPlataforma);

        self.app.get('/mg-admin/plataformascadastradas', admin.isLoggedIn, admin.plataformasCadastradas);

        //Empresas

        self.app.get('/mg-admin/cadastrarempresa', admin.isLoggedIn, admin.novaEmpresa);

        self.app.post('/mg-admin/cadastrarempresa', admin.isLoggedIn, admin.saveEmpresa);

        self.app.get('/mg-admin/editarempresa/:id?', admin.isLoggedIn, admin.editarEmpresa);

        self.app.post('/mg-admin/editarempresa/:id?', admin.isLoggedIn, admin.saveEditarEmpresa);

        self.app.get('/mg-admin/empresascadastradas', admin.isLoggedIn, admin.empresasCadastradas);


        //Parceiros

        self.app.get('/mg-admin/cadastrarparceiro', admin.isLoggedIn, admin.novoParceiro);

        self.app.post('/mg-admin/cadastrarparceiro', admin.isLoggedIn, admin.saveParceiro);

        self.app.get('/mg-admin/editarparceiro/:id?', admin.isLoggedIn, admin.editarParceiro);

        self.app.post('/mg-admin/editarparceiro/:id?', admin.isLoggedIn, admin.saveEditarParceiro);

        self.app.get('/mg-admin/parceiroscadastrados', admin.isLoggedIn, admin.parceirosCadastrados);

        //Personagens

        self.app.get('/mg-admin/cadastrarpersonagem', admin.isLoggedIn, admin.novoPersonagem);

        self.app.post('/mg-admin/cadastrarpersonagem', admin.isLoggedIn, admin.savePersonagem);

        self.app.get('/mg-admin/editarpersonagem/:id?', admin.isLoggedIn, admin.editarPersonagem);

        self.app.post('/mg-admin/editarpersonagem/:id?', admin.isLoggedIn, admin.saveEditarPersonagem);

        self.app.get('/mg-admin/personagenscadastrados', admin.isLoggedIn, admin.personagensCadastrados);

        //Análise

        self.app.get('/mg-admin/novaanalise', admin.isLoggedIn, admin.novaAnalise);

        self.app.post('/mg-admin/novaanalise', admin.isLoggedIn, admin.saveAnalise);

        self.app.get('/mg-admin/editaranalise/:id?', admin.isLoggedIn, admin.editarAnalise);

        self.app.post('/mg-admin/editaranalise/:id?', admin.isLoggedIn, admin.saveEditarAnalise);


        self.app.get('/mg-admin/novanoticia', admin.isLoggedIn, admin.novaNoticia);

        self.app.post('/mg-admin/novanoticia', admin.isLoggedIn, admin.saveNoticia);

        self.app.get('/mg-admin/novovideo', admin.isLoggedIn, admin.novoVideo); 

        self.app.post('/mg-admin/novovideo', admin.isLoggedIn, admin.saveVideo); 

        self.app.get('/mg-admin/editarvideo/:id?', admin.isLoggedIn, admin.editarVideo);

        self.app.post('/mg-admin/editarvideo/:id?', admin.isLoggedIn, admin.saveEditarVideo);   

        self.app.get('/mg-admin/loadmidias/:nome?', admin.isLoggedIn, admin.loadMidias); 

        self.app.get('/mg-admin/loadcategoriaempresas/:nome?', admin.isLoggedIn, admin.loadCategoriaEmpresas); 

        self.app.get('/mg-admin/loadparceiros/:nome?', admin.isLoggedIn, admin.loadParceiros); 

        self.app.get('/mg-admin/loadjogos/:nome?', admin.isLoggedIn, admin.loadJogos); 

        self.app.get('/mg-admin/loadcategories/:nome?', admin.isLoggedIn, admin.loadCategories);

        self.app.get('/mg-admin/loadplataformas/:nome?', admin.isLoggedIn, admin.loadPlataformas);

        self.app.get('/mg-admin/loadempresas/:nome?', admin.isLoggedIn, admin.loadEmpresas);


        self.app.post('/upload', admin.imageUpload);

        // send to facebook to do the authentication
        self.app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email,public_profile,user_friends,user_location,user_birthday,user_activities' }));
        // handle the callback after facebook has authenticated the user
        self.app.get('/auth/facebook/callback',
                    passport.authenticate('facebook', {
                        successRedirect : '/mg-admin',
                        failureRedirect : '/login'
        }));
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {      
        self.app.engine(self.engine, engine);
        self.app.set('port', self.port);
        self.app.set('views', path.join(__dirname, self.viewDir));
        self.app.set('view engine', self.viewEngine);
        self.app.use(express.favicon());
        self.app.use(express.logger('dev'));
        self.app.use(express.json());
        self.app.use(express.urlencoded());
        self.app.use(express.methodOverride());
        self.app.use(express.cookieParser());
        self.app.use(express.session({ secret: self.sessionPass })); // session secret
        self.app.use(flash());
        self.app.use(passport.initialize());
        self.app.use(passport.session()); // persistent login sessions
        self.app.use(self.app.router);
        self.app.use(express.compress());
        self.app.use(express.static(path.join(__dirname, self.publicDir), { maxAge: self.expireStatic }));
        
        // Página não encontrada - ERRO 404
        self.app.use(function(req, res) {
             res.render('erro404', {status: 404});
          });
          
          // Problema no Servidor - Erro 500
        self.app.use(function(error, req, res, next) {
         res.render('erro500', {status: 500});
         });

        // development only
        if ('development' == self.app.get('env')) {
            self.app.use(express.errorHandler());
        }

        self.createRoutes();
    };

    self.connectBD = function() {
        mongoose.connect(configDB.url);
    }    


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.setupTerminationHandlers();
        self.connectBD();
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */


/**
 *  main():  Main code.
 */
var mgapp = new MundoGamerApp();
mgapp.initialize();
mgapp.start();

