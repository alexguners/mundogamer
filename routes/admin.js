exports.logout = function(req, res) {  
  req.logout();
  res.redirect('/');
};
exports.sitemap = function(req, res) {  
  res.render('admin/sitemap',{
          user : req.user,
          title: "Sitemap Mundo Gamer",
          subtitle: "Selecione os campos para gerar um novo documento sitemap atualizado",
          message:""
        });
};

exports.ajuda = function(req, res) {  
  res.render('admin/ajuda',{
          user : req.user,
          title: "Central de Suporte Mundo Gamer",
          subtitle: "Está com dificuldades? Entre em contato com nossa equipe!",
          message:""
        });
};

exports.novoJogo = function(req, res) {  
  res.render('admin/cadastrarjogo',{
          user : req.user,
          title: "Cadastre um novo jogo",
          subtitle: "Cadastre um novo jogo no Mundo Gamer",
          message:""
        });
};

exports.novaPlataforma = function(req, res) {  
  res.render('admin/cadastrarplataforma',{
          user : req.user,
          title: "Cadastre uma nova plataforma",
          subtitle: "Cadastre uma nova plataforma no Mundo Gamer",
          message:""
        });
};

exports.novoPersonagem = function(req, res) {  
  res.render('admin/cadastrarpersonagem',{
          user : req.user,
          title: "Cadastre um novo personagem",
          subtitle: "Cadastre um novo personagem no Mundo Gamer",
          message:""
        });
};

exports.novaEmpresa = function(req, res) {  
  res.render('admin/cadastrarempresa',{
          user : req.user,
          title: "Cadastre uma nova empresa",
          subtitle: "Cadastre uma nova empresa no Mundo Gamer",
          message:""
        });
};

exports.novaCategoria = function(req, res) {  
  res.render('admin/cadastrarcategoria',{
          user : req.user,
          title: "Cadastre uma nova categoria",
          subtitle: "Cadastre uma nova categoria de jogos no Mundo Gamer",
          message:""
        });
};

exports.novaMidia = function(req, res) {  
  res.render('admin/cadastrarmidia',{
          user : req.user,
          title: "Cadastre um novo tipo de mídia",
          subtitle: "Cadastre um novo tipo de mídia no Mundo Gamer",
          message:""
        });
};

exports.novaCategoriaEmpresa = function(req, res) {  
  res.render('admin/cadastrarNovaCategoriaEmpresa',{
          user : req.user,
          title: "Cadastre um novo tipo de categoria",
          subtitle: "Cadastre um novo tipo de categoria no Mundo Gamer",
          message:""
        });
};


exports.novoParceiro = function(req, res) {  
  res.render('admin/cadastrarparceiro',{
          user : req.user,
          title: "Cadastre um novo parceiro",
          subtitle: "Cadastre um novo parceiro no Mundo Gamer",
          message:""
        });
};

exports.novaNoticia = function(req, res) {  
  res.render('admin/novanoticia',{
          user : req.user,
          title: "Nova Notícia",
          subtitle: "Cadastre sua notícia no Mundo Gamer",
          message:""
        });
};

exports.novaAnalise = function(req, res) {  
  res.render('admin/novaanalise',{
          user : req.user,
          title: "Nova Análise",
          subtitle: "Cadastre uma análise no Mundo Gamer",
          message:""
        });
};

exports.novoVideo = function(req, res) {  
  res.render('admin/novovideo',{
          user : req.user,
          title: "Publique um vídeo no Mundo Gamer",
          subtitle: "Cadastre seu video no Mundo Gamer",
          message:""
        });
};

exports.novaCobertura = function(req, res) {  
  res.render('admin/cadastrarcobertura',{
          user : req.user,
          title: "Cadastre uma nova cobertura de evento",
          subtitle: "Cadastre um novo evento que o Mundo Gamer irá realizar a cobertura",
          message:""
        });
};

exports.novoAnuncio = function(req, res) {  
  res.render('admin/cadastraranuncio',{
          user : req.user,
          title: "Crie seu anúncio no Shopping Mundo Gamer",
          subtitle: "Publique seus produtos ou serviços em nosso site",
          message:""
        });
};

//Não funcionando
exports.editarMinhaConta = function(req, res) {  
  var User       = require('../models/user');
  var ObjectId = require('mongoose').Types.ObjectId; 

  User.findOne({_id : new ObjectId(req.route.params.id)}).exec(function(err, user){
    if (err)
          return console.error(err);

        //console.log(user);

    res.render('admin/minhaconta', 
          {
            user : req.user,
            //userEdit : userEdit, // get the user out of session and pass to template
            title: "Edite os dados de sua conta  ",
            subtitle: " ",
            message:req.flash('loginMessage')
          });

  });
    
};

//Não funcionando
exports.saveEditarMinhaConta = function(req, res) {
  console.log(req.params.id);
  var User       = require('../models/user');
  var ObjectId = require('mongoose').Types.ObjectId; 
  var obid = new ObjectId();
  var path = require('path');
  var fs   = require('fs-extra')
  var formidable = require('formidable');
  var saveTo = path.join(__dirname.toString().replace('routes', '') + 'public/images/wikigamer/usuarios', path.basename(obid));

  User.findById(req.body.id, function (err, doc) {
    if (err)
          return console.error(err);

    doc.local.nome=req.body.nome;
    //doc.local.password=doc.generateHash(req.body.password);
    doc.local.email=req.body.email;
    doc.local.user_site=req.body.user_site;
    doc.local.user_twitter=req.body.user_twitter;
    doc.local.user_facebook=req.body.user_facebook;
    doc.local.user_instagram=req.body.user_instagram;
    doc.local.user_youtube=req.body.user_youtube;
    doc.local.user_psnid=req.body.user_psnid;
    doc.local.user_xboxlive=req.body.user_xboxlive;
    doc.local.user_nintendoid=req.body.user_nintendoid;
    doc.local.user_origin=req.body.user_origin;
    doc.local.user_steam=req.body.user_steam;
    doc.local.descricao=req.body.descricao;
    doc.local.imagem_perfil=req.body.imagem_perfil;


    doc.save(function(err2){
        if (err){

           res.render('admin/minhaconta', 
          {
            user : req.user,
            //userEdit : doc, // get the user out of session and pass to template
            title: "Configurações de conta",
            subtitle: " ",
            message: 'Erro ' + err
          });
        }

        res.render('admin/minhaconta', 
          {
            user : req.user,
            //userEdit : doc, // get the user out of session and pass to template
            title: "Configurações de Conta",
            subtitle: " ",
            message: 'Os dados de sua conta foram editados com sucesso'
          });

    });    

  });
    
};


exports.login = function(req, res) {  
  res.render('admin/login', { message: req.flash('loginMessage') });
};

exports.signup = function(req, res) {  
  // render the page and pass in any flash data if it exists
    res.render('admin/signup',
      { 
        user : req.user,
        title: "Novo Usuário ",
        subtitle: "Criar um novo usuário",
        message: req.flash('signupMessage') 
      }
    );
};



exports.index = function(req, res) {
  var NoticiaModel = require('../models/noticias');
  var User       = require('../models/user');
  var ObjectId = require('mongoose').Types.ObjectId; 
    if (typeof req.user.local.tipo == 'undefined'){

      NoticiaModel.find({'_criador': new ObjectId(req.user.id)}).sort({ data: 'desc'}).populate('_criador').exec(function(err, noticias) {
        if (err)
          return console.error(err);

        res.render('admin/admin', 
          {
            user : req.user,
            noticias : noticias, // get the user out of session and pass to template
            title: "Notícias Cadastradas",
            subtitle: "Visualize todas as sua notícias cadastradas no Mundo Gamer"
          });
      });
    }else if (req.user.local.tipo == 'Colaborador'){
      var ObjectId = require('mongoose').Types.ObjectId; 
      NoticiaModel.find({'_criador': new ObjectId(req.user.id)}).sort({ data: 'desc'}).populate('_criador').exec(function(err, noticias) {
        if (err)
          return console.error(err);

        res.render('admin/admin', 
          {
            user : req.user,
            noticias : noticias, // get the user out of session and pass to template
            title: "Notícias Cadastradas",
            subtitle: "Visualize todas as sua notícias cadastradas no Mundo Gamer"
          });
      });

    }else if (req.user.local.tipo == 'Administrador'){
      NoticiaModel.find().sort({ data: 'desc'}).populate('_criador').exec(function(err, noticias) {
        if (err)
          return console.error(err);

        res.render('admin/admin', 
          {
            user : req.user,
            noticias : noticias, // get the user out of session and pass to template
            title: "Notícias Cadastradas",
            subtitle: "Visualize todas as sua notícias cadastradas no Mundo Gamer"
          });
      });
    }

    
};

exports.sitemap = function(req, res) {
  var NoticiaModel = require('../models/noticias');
  var User       = require('../models/user');
  var ObjectId = require('mongoose').Types.ObjectId; 

  User.find().exec(function(err, users){
    if (err)
          return console.error(err);

        console.log(users.length);

    res.render('admin/sitemap', 
          {
            user : req.user,
            users : users, // get the user out of session and pass to template
            title: "Sitemap Mundo Gamer",
            subtitle: "Selecione os campos para gerar um novo documento sitemap atualizado",
            message:""
          });

  });
    
};


exports.users = function(req, res) {
  var NoticiaModel = require('../models/noticias');
  var User       = require('../models/user');
  var ObjectId = require('mongoose').Types.ObjectId; 

  User.find().exec(function(err, users){
    if (err)
          return console.error(err);

        console.log(users.length);
        var numberPosts = 0;

    res.render('admin/usuarios', 
          {
            user : req.user,
            users : users, // get the user out of session and pass to template
            title: "Usuarios Cadastrados",
            subtitle: "Visualize todos os usuarios cadastrados no Mundo Gamer",
            numberPosts: numberPosts
          });

  });
    
};

exports.editUser = function(req, res) {
  var NoticiaModel = require('../models/noticias');
  var User       = require('../models/user');
  var ObjectId = require('mongoose').Types.ObjectId; 

  User.findOne({_id : new ObjectId(req.route.params.id)}).exec(function(err, userEdit){
    if (err)
          return console.error(err);

        console.log(userEdit);

    res.render('admin/editarusuarios', 
          {
            user : req.user,
            userEdit : userEdit, // get the user out of session and pass to template
            title: "Editar Usuario ",
            subtitle: " ",
            message:req.flash('loginMessage')
          });

  });
    
};


exports.editSaveUser = function(req, res) {
  var NoticiaModel = require('../models/noticias');
  var User       = require('../models/user');
  var ObjectId = require('mongoose').Types.ObjectId; 

  User.findById(req.body.id, function (err, doc) {
    if (err)
          return console.error(err);

    doc.local.nome=req.body.nome;
    // doc.local.password=doc.generateHash(req.body.password);
    doc.local.email=req.body.email;
    doc.local.tipo = req.body.tipo;

    doc.save(function(err2){
        if (err){

           res.render('admin/editarusuarios', 
          {
            user : req.user,
            userEdit : doc, // get the user out of session and pass to template
            title: "Editar Usuario ",
            subtitle: " ",
            message: 'Erro ' + err
          });
        }

        res.render('admin/editarusuarios', 
          {
            user : req.user,
            userEdit : doc, // get the user out of session and pass to template
            title: "Editar Usuario ",
            subtitle: " ",
            message: 'Usuário salvo com sucesso'
          });

    });    

  });
    
};



exports.isLoggedIn = function(req, res, next) {
 // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/login');
  
}

exports.imageUpload = function(req, res) {
  var path = require('path');
  var name = new Date().getTime();
  var saveTo = path.join(__dirname.toString().replace('routes', '') + 'public/images/noticia', path.basename(name));
  var fs   = require('fs-extra')
  var formidable = require('formidable');
  var form = new formidable.IncomingForm();
  var files = [];

        form
          .on('error', function(err) {
            console.error(err);
             html = "";
              html += "<script type='text/javascript'>";
              html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
              html += "    var url     = \"/images/noticia/" + name + "\";";
              html += "    var message = \"Erro ao salvar o arquivo!\";";
              html += "";
              html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
              html += "</script>";

              res.send(html);
          })
          .on('file', function(field, file) {            
            files[field] = file;
          })
          .on('end', function() {

            fs.copy(files['upload'].path, saveTo, function(err) {  
                if (err){
                   fs.remove(files['upload'].path, function(err){
                    if (err) return console.error(err);
                  });
                    html = "";
                    html += "<script type='text/javascript'>";
                    html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
                    html += "    var url     = \"/images/noticia/" + name + "\";";
                    html += "    var message = \"Erro ao copiar arquivo.\";";
                    html += "";
                    html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
                    html += "</script>";

                    res.send(html);

                }else{

                  fs.remove(files['upload'].path, function(err){
                    if (err) return console.error(err);
                  });

                  html = "";
                  html += "<script type='text/javascript'>";
                  html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
                  html += "    var url     = \"/images/noticia/" + name + "\";";
                  html += "    var message = \"Arquivo enviado com sucesso!\";";
                  html += "";
                  html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
                  html += "</script>";
                  res.send(html);

                }
            });
          });

  form.parse(req);
  
}

exports.saveCategoria = function(req, res) {
        var CategoriaModel = require('../models/categorias');
        var ObjectId = require('mongoose').Types.ObjectId; 
        var obid = new ObjectId();
        var path = require('path');
        var fs   = require('fs-extra')
        var formidable = require('formidable');
        
        var form = new formidable.IncomingForm(),
        files = [],
        fieldsArray = [];

        form
          .on('error', function(err) {
            console.error(err);
          })
          .on('field', function(field, value) {
            fieldsArray[field]= value;
           
          })
          .on('file', function(field, file) {
            files[field] = file;
          })
          .on('end', function() {
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();


            var categoria_data = {
              _id                  : obid,
              nome_categoria       : fieldsArray['nome_categoria'],
              data_cadastro        :currentdate,
              descricao_categoria  : fieldsArray['editor1'],
              _criador             : req.user.id
            }

            var categoria = new CategoriaModel(categoria_data);
            categoria.save(function(error, cate){

           res.render('admin/cadastrarcategoria',{
           user : req.user,
           title: "Cadastre uma nova categoria",
           subtitle: "Cadastre uma nova categoria no Mundo Gamer",
           message:"Atenção!Categoria cadastrada com sucesso."
           });              

          });

        });
        form.parse(req);

}

//categorias cadastradas
exports.categoriasCadastradas = function(req, res) {
  var CategoriaModel = require('../models/categorias');
  var ObjectId = require('mongoose').Types.ObjectId; 


  CategoriaModel.find().sort({ nome_categoria: 'asc'}).exec(function(err, categorias){
    if (err)
          return console.error(err);


    res.render('admin/categoriascadastradas',  
          {
            user : req.user,
            categorias : categorias,
            title: "Categorias cadastradas",
            subtitle: "Visualize todas as categorias de jogos cadastradas no Mundo Gamer",
          });

  });
};

//Verificar pq não Funciona 
exports.editarCategoria = function(req, res) {  
  var CategoriaModel = require('../models/categorias');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
      CategoriaModel.findOne({_id: new ObjectId(req.params.id)}, function(err, categoria) {
        if (err)
          return console.error(err);

        res.render('admin/editarcategoria', 
          {
            user : req.user,  
            categoria: categoria,
            title: "Editar dados da categoria " + categoria.nome_categoria,
            subtitle: "Edite os dados da categoria cadastrada",
            message: req.flash('loginMessage')
          });
      });
  }
};

//Verificar pq não Funciona 
exports.saveEditarCategoria = function(req, res) {  
  console.log("id " + req.params.id);
  var CategoriaModel = require('../models/categorias');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
           // var title = titleToUrl(req.body.nome_parceiro);

            CategoriaModel.findByIdAndUpdate({_id: new ObjectId(req.params.id)},{ $set: {
            nome_categoria         : req.body.nome_categoria,
            descricao_categoria    : req.body.editor1,
            _criador               : req.user.id
      }}, function(err, categoria) {
        if (err){
          console.error(err);
          res.render('admin/editarcategoria', 
            {
              user : req.user,
              categoria: categoria, // get the user out of session and pass to template
              title: "Editar dados da categoria " + categoria.nome_categoria,
              subtitle: "Edite os dados da categoria",
              message: 'Erro ao salvar'
            });

        }else{
            res.render('admin/editarcategoria', 
            {
              user : req.user,
              categoria: categoria,// get the user out of session and pass to template
              title: "Editar dados da categoria " + categoria.nome_categoria,
              subtitle: "Edite os dados da categoria",
              message: 'As informações foram alteradas com sucesso'
            });
        }

    });

        
  }
};

// Salvar tipo de mídia
exports.saveMidia = function(req, res) {
        var MidiaModel = require('../models/midias');
        var ObjectId = require('mongoose').Types.ObjectId; 
        var obid = new ObjectId();
        var path = require('path');
        var fs   = require('fs-extra')
        var formidable = require('formidable');
        
        var form = new formidable.IncomingForm(),
        files = [],
        fieldsArray = [];

        form
          .on('error', function(err) {
            console.error(err);
          })
          .on('field', function(field, value) {
            fieldsArray[field]= value;
           
          })
          .on('file', function(field, file) {
            files[field] = file;
          })
          .on('end', function() {
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

            var midia_data = {
              _id                  : obid,
              nome_midia       : fieldsArray['nome_midia'],
              data_cadastro    : currentdate,
              descricao_midia  : fieldsArray['editor1'],
              _criador             : req.user.id
            }

            var midia = new MidiaModel(midia_data);
            midia.save(function(error, cate){

           res.render('admin/cadastrarmidia',{
           user : req.user,
           title: "Cadastre um novo tipo de mídia",
           subtitle: "Cadastre um novo tipo de mídia no Mundo Gamer",
           message:"Atenção!Mídia cadastrada com sucesso."
           });              

          });

        });
        form.parse(req);

}

//categorias cadastradas
exports.midiasCadastradas = function(req, res) {
  var MidiaModel = require('../models/midias');
  var ObjectId = require('mongoose').Types.ObjectId; 


  MidiaModel.find().sort({ nome_midia: 'asc'}).exec(function(err, midias){
    if (err)
          return console.error(err);


    res.render('admin/midiascadastradas',  
          {
            user : req.user,
            midias : midias,
            title: "Tipos de mídias cadastradas",
            subtitle: "Visualize todos os tipos de mídias cadastradas no Mundo Gamer",
          });

  });
};

//Verificar pq não Funciona 
exports.editarMidia = function(req, res) {  
  var MidiaModel = require('../models/midias');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
      MidiaModel.findOne({_id: new ObjectId(req.params.id)}, function(err, midia) {
        if (err)
          return console.error(err);

        res.render('admin/editarmidia', 
          {
            user : req.user,  
            midia: midia,
            title: "Editar dados da mídia " + midia.nome_midia,
            subtitle: "Edite os dados da mídia cadastrada",
            message: req.flash('loginMessage')
          });
      });
  }
};

//Verificar pq não Funciona 
exports.saveEditarMidia = function(req, res) {  
  console.log("id " + req.params.id);
  var MidiaModel = require('../models/midias');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
           // var title = titleToUrl(req.body.nome_parceiro);

            MidiaModel.findByIdAndUpdate({_id: new ObjectId(req.params.id)},{ $set: {
            nome_midia         : req.body.nome_midia,
            descricao_midia    : req.body.editor1,
            _criador               : req.user.id
      }}, function(err, midia) {
        if (err){
          console.error(err);
          res.render('admin/editarmidia', 
            {
              user : req.user,
              midia: midia, // get the user out of session and pass to template
              title: "Editar dados da mídia " + midia.nome_midia,
              subtitle: "Edite os dados da mídia",
              message: 'Erro ao salvar'
            });

        }else{
            res.render('admin/editarmidia', 
            {
              user : req.user,
              midia: midia,// get the user out of session and pass to template
              title: "Editar dados da midia " + midia.nome_midia,
              subtitle: "Edite os dados da mídia",
              message: 'As informações foram alteradas com sucesso'
            });
        }

    });

        
  }
};


// Salvar tipo de Categoria Empresa
exports.saveCategoriaEmpresa = function(req, res) {
        var CategoriaEmpresaModel = require('../models/categoriaempresas');
        var ObjectId = require('mongoose').Types.ObjectId; 
        var obid = new ObjectId();
        var path = require('path');
        var fs   = require('fs-extra')
        var formidable = require('formidable');
        
        var form = new formidable.IncomingForm(),
        files = [],
        fieldsArray = [];

        form
          .on('error', function(err) {
            console.error(err);
          })
          .on('field', function(field, value) {
            fieldsArray[field]= value;
           
          })
          .on('file', function(field, file) {
            files[field] = file;
          })
          .on('end', function() {

            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();


            var CategoriaEmpresa_data = {
              _id                  : obid,
              nome_categoria       : fieldsArray['nome_categoria'],
              data_cadastro        : currentdate,
              descricao_categoria  : fieldsArray['editor1'],
              _criador             : req.user.id
            }

            var CategoriaEmpresa = new CategoriaEmpresaModel(CategoriaEmpresa_data);
            CategoriaEmpresa.save(function(error, cate){

           res.render('admin/cadastrarNovaCategoriaEmpresa',{
           user : req.user,
           title: "Cadastre um novo tipo de categoria",
           subtitle: "Cadastre um novo tipo de categoria no Mundo Gamer",
           message:"Atenção!Categoria cadastrada com sucesso."
           });              

          });

        });
        form.parse(req);

}

//categorias cadastradas
exports.categoriasEmpresasCadastradas = function(req, res) {
  var CategoriaEmpresaModel = require('../models/categoriaempresas');
  var ObjectId = require('mongoose').Types.ObjectId; 


  CategoriaEmpresaModel.find().sort({ nome_categoria: 'asc'}).exec(function(err, categoriaempresas){
    if (err)
          return console.error(err);


    res.render('admin/categoriasEmpresasCadastradas',  
          {
            user : req.user,
            categoriaempresas : categoriaempresas,
            title: "Tipos de empresas cadastradas",
            subtitle: "Visualize todos os tipos de empresas cadastradas no Mundo Gamer",
          });

  });
};

//Verificar pq não Funciona 
exports.editarCategoriaEmpresa = function(req, res) {  
  var CategoriaEmpresaModel = require('../models/categoriaempresas');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
      CategoriaEmpresaModel.findOne({_id: new ObjectId(req.params.id)}, function(err, categoriaempresa) {
        if (err)
          return console.error(err);

        res.render('admin/editarCategoriaEmpresa', 
          {
            user : req.user,  
            categoriaempresa: categoriaempresa,
            title: "Editar dados da categoria " + categoriaempresa.nome_categoria,
            subtitle: "Edite os dados da categoria cadastrada",
            message: req.flash('loginMessage')
          });
      });
  }
};

//Verificar pq não Funciona 
exports.saveEditarCategoriaEmpresa = function(req, res) {  
  console.log("id " + req.params.id);
  var CategoriaEmpresaModel = require('../models/categoriaempresas');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
           // var title = titleToUrl(req.body.nome_parceiro);

            CategoriaEmpresaModel.findByIdAndUpdate({_id: new ObjectId(req.params.id)},{ $set: {
            nome_categoria         : req.body.nome_categoria,
            descricao_categoria    : req.body.editor1,
            _criador               : req.user.id
      }}, function(err, categoriaempresa) {
        if (err){
          console.error(err);
          res.render('admin/editarCategoriaEmpresa', 
            {
              user : req.user,
              categoriaempresa: categoriaempresa, // get the user out of session and pass to template
              title: "Editar dados da categoria " + categoriaempresa.nome_categoria,
              subtitle: "Edite os dados da categoria",
              message: 'Erro ao salvar'
            });

        }else{
            res.render('admin/editarCategoriaEmpresa', 
            {
              user : req.user,
              categoriaempresa: categoriaempresa,// get the user out of session and pass to template
              title: "Editar dados da categoria " + categoriaempresa.nome_categoria,
              subtitle: "Edite os dados da categoria",
              message: 'As informações foram alteradas com sucesso'
            });
        }

    });

        
  }
};



//salva o personagem no banco de dados
exports.savePersonagem = function(req, res) {
        var PersonagemModel = require('../models/personagens');
        //var CategoriaModel = require('../models/categorias');
        var ObjectId = require('mongoose').Types.ObjectId; 
        var obid = new ObjectId();
        var path = require('path');
        var fs   = require('fs-extra')
        var formidable = require('formidable');
        var saveTo = path.join(__dirname.toString().replace('routes', '') + 'public/images/wikigamer/personagens/capas', path.basename(obid));
        var saveToBanner = path.join(__dirname.toString().replace('routes', '') + 'public/images/wikigamer/personagens/banners', path.basename(obid));

        
        var form = new formidable.IncomingForm(),
        files = [],
        fieldsArray = [];

        form
          .on('error', function(err) {
            console.error(err);
          })
          .on('field', function(field, value) {
            fieldsArray[field]= value;
           
          })
          .on('file', function(field, file) {
            files[field] = file;
          })
          .on('end', function() {
             var dataSepareted = fieldsArray['data_nascimento'].split(" ");
             var date = dataSepareted[0].split("/");
             // var time = dataSepareted[1].split(":");
             var data_nascimento = new Date(date[2]+ "." + date[1]+ "." + date[0]);;
           
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();


            var title = titleToUrlWiki(fieldsArray['nome_personagem']);
            // var now = new Date();

            var personagem_data = {
              _id                      : obid,
              nome_personagem          : fieldsArray['nome_personagem'],
              data_cadastro            : currentdate,
              genero_personagem        : fieldsArray['genero_personagem'],
              primeirojogo_personagem  : fieldsArray['primeirojogo_personagem'],
              anoprimjogo_personagem   : fieldsArray['anoprimjogo_personagem'],
              criador_personagem       : fieldsArray['criador_personagem'],
              origem_personagem        : fieldsArray['origem_personagem'],
              planeta_personagem       : fieldsArray['planeta_personagem'],
              especie_personagem       : fieldsArray['especie_personagem'],
              profissao_personagem     : fieldsArray['profissao_personagem'],
              data_nascimento          : data_nascimento,
              url                      : title,
              nome_fonte               : fieldsArray['nome_fonte'],
              url_fonte                : fieldsArray['url_fonte'], 
              descricao_personagem     : fieldsArray['editor1'],
              _criador                 : req.user.id
            }

            var personagem = new PersonagemModel(personagem_data);
              personagem.save(function(error, personagem){

                if (error){
                  fs.remove(files['capa_personagem'].path, function(err){
                              if (err) return console.error(err);

                            });
                  res.render('admin/cadastrarpersonagem',{
                  user : req.user,
                  title: "Cadastre um novo personagem",
                  subtitle: "Cadastre um novo personagem no Mundo Gamer",
                  message:"Atenção, não foi possivel inserir."
                });

                }else{
                    var im = require('imagemagick');
                    im.crop({
                      srcPath: files['capa_personagem'].path,
                      dstPath: saveTo,
                      width:   250,
                      height:  250,
                      strip: true
                    }, function(err, stdout, stderr){
                        if (err){
                           console.error(err);
                            fs.remove(files['capa_personagem'].path, function(err){
                              if (err) return console.error(err);
                            });
                              res.render('admin/cadastrarpersonagem',{
                              user : req.user,
                              title: "Cadastre um novo personagem",
                              subtitle: "Cadastre um novo personagem no Mundo Gamer",
                              message:"Atenção!Personagem inserido com erro ao fazer upload da capa."
                          });
                          }else{
                              fs.remove(files['capa_personagem'].path, function(err){
                                if (err) return console.error(err);
                              });

                              im.crop({
                                srcPath: files['personagem_banner01'].path,
                                dstPath: saveToBanner + "01",
                                width:   900,
                                height:  385,
                                strip: true
                              }, function(err, stdout, stderr){
                                  if (err){
                                     console.error(err);
                                      fs.remove(files['personagem_banner01'].path, function(err){
                                        if (err) return console.error(err);


                                      });
                                      fs.remove(saveTo, function(err){
                                        if (err) return console.error(err);
                                      });
                                        res.render('admin/cadastrarpersonagem',{
                                        user : req.user,
                                        title: "Cadastre um novo personagem",
                                        subtitle: "Cadastre um novo personagem no Mundo Gamer",
                                        message:"Atenção!Personagem inserido com erro ao fazer upload da capa."
                                    });
                                    }else{
                                        fs.remove(files['personagem_banner01'].path, function(err){
                                          if (err) return console.error(err);
                                        });

                                        im.crop({
                                          srcPath: files['personagem_banner02'].path,
                                          dstPath: saveToBanner + "02",
                                          width:   900,
                                          height:  385,
                                          strip: true
                                        }, function(err, stdout, stderr){
                                            if (err){
                                               console.error(err);
                                                fs.remove(files['personagem_banner02'].path, function(err){
                                                  if (err) return console.error(err);
                                                });
                                                fs.remove(saveTo, function(err){
                                                  if (err) return console.error(err);
                                                });
                                                fs.remove(saveToBanner + "01", function(err){
                                                  if (err) return console.error(err);
                                                });
                                                  res.render('admin/cadastrarpersonagem',{
                                                  user : req.user,
                                                  title: "Cadastre um novo personagem",
                                                  subtitle: "Cadastre um novo personagem no Mundo Gamer",
                                                  message:"Atenção!Ṕersonagem inserido com erro ao fazer upload da logo."
                                              });
                                              }else{
                                                  fs.remove(files['personagem_banner02'].path, function(err){
                                                    if (err) return console.error(err);
                                                  });

                                                  res.render('admin/cadastrarpersonagem',{
                                                            user : req.user,
                                                            title: "Cadastre um novo personagem",
                                                            subtitle: "Cadastre um novo personagem no Mundo Gamer",
                                                            message:"Atenção!Ṕersonagem inserido com sucesso."
                                                            });

                                                  //
                                                  var mailer = require("nodemailer");

                                                      // Use Smtp Protocol to send Email
                                                      var smtpTransport = mailer.createTransport("SMTP",{
                                                          host: "mx.mundogamer.com.br", // hostname
                                                          port: 587, // port for secure SMTP
                                                          auth: {
                                                              user: "contato@mundogamer.com.br",
                                                              pass: "asdf1234"
                                                          }
                                                      });

                                                      var mail = {
                                                          from: "Sistema Mundo Gamer <contato@mundogamer.com.br>",
                                                          to: "contato@mundogamer.com.br",
                                                          subject: "O usuário " + req.user.local.nome + " cadastrou um novo personagem",
                                                          //text: "Node.js New world for me",
                                                          html: "O usuário <b>" + req.user.local.nome + "</b> cadastrou uma novo personagem no Mundo Gamer.<br><br> Confira os dados da publicação:<br><br>" +
                                                          //"Imagem de destaque: " + "<center><img" + noticia.capa + "/></center>" + "<br>" +
                                                          "<b>Nome do personagem:</b> " + personagem_data.nome_personagem + "<br>" +
                                                          "<b>Data do cadastro:</b> " + personagem_data.data_cadastro + "<br>" +
                                                          "<b>Descrição do personagem:</b> " + personagem_data.descricao_personagem + "<br>"
                                                          
                                                      }

                                                      smtpTransport.sendMail(mail, function(error, response){
                                                          if(error){
                                                              console.log(error);
                                                          }else{
                                                              console.log("Message sent: " + response.message);
                                                          }

                                                          smtpTransport.close();
                                                      });

                                                  //  im.crop({
                                                  //   srcPath: files['jogo_banner02'].path,
                                                  //   dstPath: saveToBanner + "02",
                                                  //   width:   200,
                                                  //   height:  250,
                                                  //   strip: true
                                                  // }, function(err, stdout, stderr){
                                                  //     if (err){
                                                  //        console.error(err);
                                                  //         fs.remove(files['jogo_banner02'].path, function(err){
                                                  //           if (err) return console.error(err);
                                                  //         });
                                                  //         fs.remove(saveTo, function(err){
                                                  //           if (err) return console.error(err);
                                                  //         });
                                                  //         fs.remove(saveToBanner + "01", function(err){
                                                  //           if (err) return console.error(err);
                                                  //         });
                                                  //         fs.remove(saveToBanner + "02", function(err){
                                                  //           if (err) return console.error(err);
                                                  //         });
                                                  //           res.render('admin/cadastrarjogo',{
                                                  //           user : req.user,
                                                  //           title: "Cadastre um novo jogo",
                                                  //           subtitle: "Cadastre um novo jogo no Mundo Gamer",
                                                  //           message:"Atenção!Jogo inserido com erro ao fazer upload da logo."
                                                  //       });
                                                  //       }else{
                                                  //           fs.remove(files['jogo_banner02'].path, function(err){
                                                  //             if (err) return console.error(err);
                                                  //           });

                                                  //           res.render('admin/cadastrarjogo',{
                                                  //           user : req.user,
                                                  //           title: "Cadastre um novo jogo",
                                                  //           subtitle: "Cadastre um novo jogo no Mundo Gamer",
                                                  //           message:"Atenção!Jogo inserido com sucesso."
                                                  //           });
                                                  //         }  
                                                  // });
                                                }  
                                        });
                                      }  
                                  });
                                }  
                            });

            }
          });
        });
        form.parse(req);

}

//Ṕersonagens cadastradas
exports.personagensCadastrados = function(req, res) {
  var PersonagemModel = require('../models/personagens');
  var ObjectId = require('mongoose').Types.ObjectId; 


  PersonagemModel.find().sort({ nome_personagem: 'asc'}).exec(function(err, personagens){
    if (err)
          return console.error(err);


    res.render('admin/personagenscadastrados',  
          {
            user : req.user,
            personagens : personagens,
            title: "Personagens cadastrados",
            subtitle: "Visualize todos os personagens cadastrados no Mundo Gamer",
          });

  });
};

exports.editarPersonagem = function(req, res) {  
  console.log(req.params.id);
  var PersonagemModel = require('../models/personagens');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
      PersonagemModel.findOne({_id: new ObjectId(req.params.id)}, function(err, personagem) {
        if (err)
          return console.error(err);

        res.render('admin/editarpersonagem', 
          {
            user : req.user,  
            personagem : personagem,
            title: "Editar informações do personagem " + personagem.nome_personagem,
            subtitle: "Edite os dados do personagem",
            message: req.flash('loginMessage')
          });
      }).populate('_criador');
  }
};

//Verificar pq não Funciona 
exports.saveEditarPersonagem = function(req, res) {  
  console.log(req.params.id);
  var PersonagemModel = require('../models/personagens');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
      var dataSepareted = req.body.data_nascimento.split(" ");
             var date = dataSepareted[0].split("/");
             // var time = dataSepareted[1].split(":");
             var data_nascimento = new Date(date[2]+ "." + date[1]+ "." + date[0]);;
             // datainicio.setHours(time[0],time[1],time[2],0);
           // var title = titleToUrl(req.body.nome_parceiro);

           

           var title = titleToUrlWiki(req.body.nome_personagem);

            PersonagemModel.findByIdAndUpdate({_id: new ObjectId(req.params.id)},{ $set: {

            nome_personagem         : req.body.nome_personagem,
            genero_personagem       : req.body.genero_personagem, 
            data_nascimento         : data_nascimento,
            url                     : title,
            primeirojogo_personagem : req.body.primeirojogo_personagem,
            anoprimjogo_personagem  : req.body.anoprimjogo_personagem,
            criador_personagem      : req.body.criador_personagem,
            origem_personagem       : req.body.origem_personagem,
            planeta_personagem      : req.body.planeta_personagem,
            especie_personagem      : req.body.especie_personagem,
            profissao_personagem    : req.body.profissao_personagem,
            descricao_personagem    : req.body.editor1,
            nome_fonte              :req.body.nome_fonte,
            url_fonte               :req.body.url_fonte,
            _criador                : req.user.id,

      }}, function(err, personagem) {
        if (err){
          console.error(err);
          res.render('admin/editarpersonagem', 
            {
              user : req.user,
              personagem : personagem, // get the user out of session and pass to template
              title: "Editar informações do personagem " + personagem.nome_personagem,
              subtitle: "Edite os dados do personagem",
              message: 'Erro ao salvar'
            });

        }else{
            res.render('admin/editarpersonagem', 
            {
              user : req.user,
              personagem : personagem,// get the user out of session and pass to template
              title: "Editar informações do personagem " + personagem.nome_personagem,
              subtitle: "Edite os dados do personagem",
              message: 'As informações foram alteradas com sucesso'
            });
        }

    });

        
  }
};

// //Cadastrar Empresa
exports.saveEmpresa = function(req, res) {

        var EmpresaModel = require('../models/empresas');
        var ObjectId = require('mongoose').Types.ObjectId; 
        var obid = new ObjectId();
        var path = require('path');
        var fs   = require('fs-extra')
        var formidable = require('formidable');
        var saveTo = path.join(__dirname.toString().replace('routes', '') + 'public/images/wikigamer/empresas/logos', path.basename(obid));
        
        var form = new formidable.IncomingForm(),
        files = [],
        fieldsArray = [];

        form
          .on('error', function(err) {
            console.error(err);
          })
          .on('field', function(field, value) {
            fieldsArray[field]= value;
           
          })
          .on('file', function(field, file) {
            files[field] = file;
          })
          .on('end', function() {

            var title = titleToUrlWiki(fieldsArray['nome_empresa']);
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();


            var empresa_data = {
              _id                      : obid,
              nome_empresa             : fieldsArray['nome_empresa'],
              email                    : fieldsArray['email'],
              data_cadastro            : currentdate,
              ano_fundacao             : fieldsArray['ano_fundacao'],
              localizacao              : fieldsArray['localizacao'],
              site                     : fieldsArray['site'],
              tipo                     : fieldsArray['tipo'],
              url                      : title,
              descricao_empresa        : fieldsArray['editor1'],
              _criador                 : req.user.id
            }

            var empresa = new EmpresaModel(empresa_data);
              empresa.save(function(error, empresa){

                if (error){
                  fs.remove(files['capa_empresa'].path, function(err){
                              if (err) return console.error(err);

                            });
                  res.render('admin/cadastrarempresa',{
                  user : req.user,
                  title: "Nova Empresa",
                  subtitle: "Cadastre uma empresa no Mundo Gamer",
                  message:"Atenção, não foi possivel inserir."
                });

                }else{
                    var im = require('imagemagick');
                    im.crop({
                      srcPath: files['capa_empresa'].path,
                      dstPath: saveTo,
                      width:   300,
                      height:  200,
                      strip: true
                    }, function(err, stdout, stderr){
                        if (err){
                           console.error(err);
                            fs.remove(files['capa_empresa'].path, function(err){
                              if (err) return console.error(err);


                            });
                            res.render('admin/cadastrarempresa',{
                              user : req.user,
                              title: "Nova Empresa",
                              subtitle: "Cadastre uma empresa no Mundo Gamer",
                              message:"Atenção! Empresa inserida com erro ao fazer upload da Capa."
                          });
                          }else{
                              fs.remove(files['capa_empresa'].path, function(err){
                                if (err) return console.error(err);
                              });

                              res.render('admin/cadastrarempresa',{
                                user : req.user,
                                title: "Nova Empresa",
                                subtitle: "Cadastre uma empresa no Mundo Gamer",
                                message:"Empresa cadastrada com sucesso"
                              });

                            }  
              });

            }
          });
        });
        form.parse(req);
}
//Empresas cadastradas
exports.empresasCadastradas = function(req, res) {
  var EmpresaModel = require('../models/empresas');
  var ObjectId = require('mongoose').Types.ObjectId; 


  EmpresaModel.find().sort({ nome_empresa: 'asc'}).exec(function(err, empresas){
    if (err)
          return console.error(err);


    res.render('admin/empresascadastradas',  
          {
            user : req.user,
            empresas : empresas,
            title: "Empresas cadastradas",
            subtitle: "Visualize todos as empresas cadastradas no Mundo Gamer",
          });

  });
};

exports.editarEmpresa = function(req, res) {  
  console.log(req.params.id);
  var EmpresaModel = require('../models/empresas');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
      EmpresaModel.findOne({_id: new ObjectId(req.params.id)}, function(err, empresa) {
        if (err)
          return console.error(err);

        res.render('admin/editarempresa', 
          {
            user : req.user,  
            empresa : empresa,
            title: "Editar informações da empresa " + empresa.nome_empresa,
            subtitle: "Edite os dados da empresa",
            message: req.flash('loginMessage')
          });
      }).populate('_criador');
  }
};

exports.saveEditarEmpresa = function(req, res) {  
  console.log(req.params.id);
  var EmpresaModel = require('../models/empresas');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
         

           var title = titleToUrlWiki(req.body.nome_empresa);

            EmpresaModel.findByIdAndUpdate({_id: new ObjectId(req.params.id)},{ $set: {

            nome_empresa         : req.body.nome_empresa,
            email                : req.body.email, 
            url                  : title,
            ano_fundacao         : req.body.ano_fundacao,
            localizacao          : req.body.localizacao,
            site                 : req.body.site,
            tipo                 : req.body.tipo,
            descricao_empresa    : req.body.editor1,
            _criador             : req.user.id,

      }}, function(err, empresa) {
        if (err){
          console.error(err);
          res.render('admin/editarempresa', 
            {
              user : req.user,
              empresa : empresa, // get the user out of session and pass to template
              title: "Editar informações da empresa " + empresa.nome_empresa,
              subtitle: "Edite os dados da empresa",
              message: 'Erro ao salvar'
            });

        }else{
            res.render('admin/editarempresa', 
            {
              user : req.user,
              empresa : empresa,// get the user out of session and pass to template
              title: "Editar informações da empresa " + empresa.nome_empresa,
              subtitle: "Edite os dados da empresa",
              message: 'As informações foram alteradas com sucesso'
            });
        }

    });

        
  }
};



//salva o  jogo no banco de dados
exports.saveJogo = function(req, res) {
        var JogoModel = require('../models/jogos');
        var CategoriaModel = require('../models/categorias');
        var ObjectId = require('mongoose').Types.ObjectId; 
        var obid = new ObjectId();
        var path = require('path');
        var fs   = require('fs-extra')
        var formidable = require('formidable');
        var saveTo = path.join(__dirname.toString().replace('routes', '') + 'public/images/wikigamer/jogos/capas', path.basename(obid));
        var saveToBanner = path.join(__dirname.toString().replace('routes', '') + 'public/images/wikigamer/jogos/banners', path.basename(obid));

        
        var form = new formidable.IncomingForm(),
        files = [],
        fieldsArray = [];

        form
          .on('error', function(err) {
            console.error(err);
          })
          .on('field', function(field, value) {
            fieldsArray[field]= value;
           
          })
          .on('file', function(field, file) {
            files[field] = file;
          })
          .on('end', function() {
             var dataSepareted = fieldsArray['data_lancamento'].split(" ");
             var date = dataSepareted[0].split("/");
             // var time = dataSepareted[1].split(":");
             var data_lancamento = new Date(date[2]+ "." + date[1]+ "." + date[0]);
             var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();


            var title = titleToUrlWiki(fieldsArray['nome_jogo']);
            // var now = new Date();

            var jogo_data = {
              _id                : obid,
              nome_jogo          : fieldsArray['nome_jogo'],
              desenvolvedor      : fieldsArray['desenvolvedor'],
              editora            : fieldsArray['editora'],
              data_lancamento    : data_lancamento,
              data_cadastro      : currentdate,
              url                : title,
              site               : fieldsArray['site'],
              categoria          : fieldsArray['categoria'],
              plataformas        : fieldsArray['plataformas'],
              nome_fonte         : fieldsArray['nome_fonte'],
              url_fonte          : fieldsArray['url_fonte'], 
              descricao_jogo : fieldsArray['editor1'],
              _criador           : req.user.id
            }

            var jogo = new JogoModel(jogo_data);
              jogo.save(function(error, jogo){

                if (error){
                  fs.remove(files['capa_jogo'].path, function(err){
                              if (err) return console.error(err);

                            });
                  res.render('admin/cadastrarjogo',{
                  user : req.user,
                  title: "Cadastre um novo jogo",
                  subtitle: "Cadastre um novo jogo Mundo Gamer",
                  message:"Atenção, não foi possivel inserir."
                });

                }else{
                    var im = require('imagemagick');
                    im.crop({
                      srcPath: files['capa_jogo'].path,
                      dstPath: saveTo,
                      width:   200,
                      height:  250,
                      strip: true
                    }, function(err, stdout, stderr){
                        if (err){
                           console.error(err);
                            fs.remove(files['capa_jogo'].path, function(err){
                              if (err) return console.error(err);
                            });
                              res.render('admin/cadastrarjogo',{
                              user : req.user,
                              title: "Cadastre um novo jogo",
                              subtitle: "Cadastre um novo jogo no Mundo Gamer",
                              message:"Atenção!Jogo inserido com erro ao fazer upload da logo."
                          });
                          }else{
                              fs.remove(files['capa_jogo'].path,   function(err){
                                if (err) return console.error(err);
                              });

                              im.crop({
                                srcPath: files['jogo_banner01'].path,
                                dstPath: saveToBanner + "01",
                                width:   900,
                                height:  385,
                                strip: true
                              }, function(err, stdout, stderr){
                                  if (err){
                                     console.error(err);
                                      fs.remove(files['jogo_banner01'].path, function(err){
                                        if (err) return console.error(err);


                                      });
                                      fs.remove(saveTo, function(err){
                                        if (err) return console.error(err);
                                      });
                                        res.render('admin/cadastrarjogo',{
                                        user : req.user,
                                        title: "Cadastre um novo jogo",
                                        subtitle: "Cadastre um novo jogo no Mundo Gamer",
                                        message:"Atenção!Jogo inserido com erro ao fazer upload da logo."
                                    });
                                    }else{
                                        fs.remove(files['jogo_banner01'].path, function(err){
                                          if (err) return console.error(err);
                                        });

                                        im.crop({
                                          srcPath: files['jogo_banner02'].path,
                                          dstPath: saveToBanner + "02",
                                          width:   900,
                                          height:  385,
                                          strip: true
                                        }, function(err, stdout, stderr){
                                            if (err){
                                               console.error(err);
                                                fs.remove(files['jogo_banner02'].path, function(err){
                                                  if (err) return console.error(err);
                                                });
                                                fs.remove(saveTo, function(err){
                                                  if (err) return console.error(err);
                                                });
                                                fs.remove(saveToBanner + "01", function(err){
                                                  if (err) return console.error(err);
                                                });
                                                  res.render('admin/cadastrarjogo',{
                                                  user : req.user,
                                                  title: "Cadastre um novo jogo",
                                                  subtitle: "Cadastre um novo jogo no Mundo Gamer",
                                                  message:"Atenção!Jogo inserido com erro ao fazer upload da logo."
                                              });
                                              }else{
                                                  fs.remove(files['jogo_banner02'].path, function(err){
                                                    if (err) return console.error(err);
                                                  });

                                                  res.render('admin/cadastrarjogo',{
                                                            user : req.user,
                                                            title: "Cadastre um novo jogo",
                                                            subtitle: "Cadastre um novo jogo no Mundo Gamer",
                                                            message:"Atenção!Jogo inserido com sucesso."
                                                            });

                                                  var mailer = require("nodemailer");

                                                      // Use Smtp Protocol to send Email
                                                      var smtpTransport = mailer.createTransport("SMTP",{
                                                          host: "mx.mundogamer.com.br", // hostname
                                                          port: 587, // port for secure SMTP
                                                          auth: {
                                                              user: "contato@mundogamer.com.br",
                                                              pass: "asdf1234"
                                                          }
                                                      });

                                                      var mail = {
                                                          from: "Sistema Mundo Gamer <contato@mundogamer.com.br>",
                                                          to: "contato@mundogamer.com.br",
                                                          subject: "O usuário " + req.user.local.nome + " cadastrou um novo jogo",
                                                          //text: "Node.js New world for me",
                                                          html: "O usuário <b>" + req.user.local.nome + "</b> cadastrou uma novo jogo no Mundo Gamer.<br><br> Confira os dados da publicação:<br><br>" +
                                                          //"Imagem de destaque: " + "<center><img" + noticia.capa + "/></center>" + "<br>" +
                                                          "<b>Nome do jogo:</b> " + jogo_data.nome_jogo + "<br>" +
                                                          "<b>Data do cadastro:</b> " + jogo_data.data_cadastro + "<br>" +
                                                          "<b>Categoria do jogo:</b> " + jogo_data.categoria + "<br>" +
                                                          "<b>Descrição do jogo:</b> " + jogo_data.descricao_jogo + "<br>"
                                                          
                                                      }

                                                      smtpTransport.sendMail(mail, function(error, response){
                                                          if(error){
                                                              console.log(error);
                                                          }else{
                                                              console.log("Message sent: " + response.message);
                                                          }

                                                          smtpTransport.close();
                                                      });


                                                }  
                                        });
                                      }  
                                  });
                                }  
                            });

            }
          });
        });
        form.parse(req);

}


//plataformas cadastradas
exports.jogosCadastrados = function(req, res) {
  var JogoModel = require('../models/jogos');
  var ObjectId = require('mongoose').Types.ObjectId; 


  JogoModel.find().sort({ nome_jogo: 'asc'}).exec(function(err, jogos){
    if (err)
          return console.error(err);


    res.render('admin/jogoscadastrados',  
          {
            user : req.user,
            jogos : jogos,
            title: "Jogos cadastrados",
            subtitle: "Visualize todos os jogos cadastrados no Mundo Gamer",
          });

  });
};

//Verificar pq não Funciona 
exports.editarJogo = function(req, res) {  
  console.log(req.params.id);
  var JogoModel = require('../models/jogos');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
      JogoModel.findOne({_id: new ObjectId(req.params.id)}, function(err, jogo) {
        if (err)
          return console.error(err);

        res.render('admin/editarjogo', 
          {
            user : req.user,  
            jogo: jogo,
            title: "Editar informações do jogo " + jogo.nome_jogo,
            subtitle: "Edite os dados do jogo",
            message: req.flash('loginMessage')
          });
      }).populate('_criador');
  }
};

//Verificar pq não Funciona 
exports.saveEditarJogo = function(req, res) {  
  console.log(req.params.id);
  var JogoModel = require('../models/jogos');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
      var dataSepareted = req.body.data_lancamento.split(" ");
             var date = dataSepareted[0].split("/");
             // var time = dataSepareted[1].split(":");
             var data_lancamento = new Date(date[2]+ "." + date[1]+ "." + date[0]);;
             // datainicio.setHours(time[0],time[1],time[2],0);
           // var title = titleToUrl(req.body.nome_parceiro);

           

           var title = titleToUrlWiki(req.body.nome_jogo);

            JogoModel.findByIdAndUpdate({_id: new ObjectId(req.params.id)},{ $set: {

            nome_jogo               : req.body.nome_jogo,
            desenvolvedor           : req.body.desenvolvedor,
            editora                 : req.body.editora,
            data_lancamento         : data_lancamento,
            url                     : title,
            categoria               : req.body.categoria,
            site                    : req.body.site,
            plataformas             : req.body.plataformas,
            nome_fonte              :req.body.nome_fonte,
            url_fonte               :req.body.url_fonte,
            descricao_jogo          : req.body.editor1,
            _criador                : req.user.id,

      }}, function(err, jogo) {
        if (err){
          console.error(err);
          res.render('admin/editarjogo', 
            {
              user : req.user,
              jogo: jogo, // get the user out of session and pass to template
              title: "Editar informações do jogo " + jogo.nome_jogo,
              subtitle: "Edite os dados do jogo",
              message: 'Erro ao salvar'
            });

        }else{
            res.render('admin/editarjogo', 
            {
              user : req.user,
              jogo: jogo,// get the user out of session and pass to template
              title: "Editar informações do jogo " + jogo.nome_jogo,
              subtitle: "Edite os dados do jogo",
              message: 'As informações foram alteradas com sucesso'
            });
        }

    });

        
  }
};

//salva o plataforma no banco de dados
exports.savePlataforma = function(req, res) {
        var PlataformaModel = require('../models/plataformas');
        var ObjectId = require('mongoose').Types.ObjectId; 
        var obid = new ObjectId();
        var path = require('path');
        var fs   = require('fs-extra')
        var formidable = require('formidable');
        var saveTo = path.join(__dirname.toString().replace('routes', '') + 'public/images/wikigamer/plataformas/consoles_capa', path.basename(obid));
        var saveToBanner = path.join(__dirname.toString().replace('routes', '') + 'public/images/wikigamer/plataformas/consoles_banner', path.basename(obid));
        
        var form = new formidable.IncomingForm(),
        files = [],
        fieldsArray = [];

        form
          .on('error', function(err) {
            console.error(err);
          })
          .on('field', function(field, value) {
            fieldsArray[field]= value;
           
          })
          .on('file', function(field, file) {
            files[field] = file;
          })
          .on('end', function() {
          var dataSepareted = fieldsArray['lancamento_plataforma'].split(" ");
             var date = dataSepareted[0].split("/");
             // var time = dataSepareted[1].split(":");
             var lancamento_plataforma = new Date(date[2]+ "." + date[1]+ "." + date[0]);;
             
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

            var title = titleToUrlWiki(fieldsArray['nome_plataforma']);
            


            var plataforma_data = {
              _id                  : obid,
              nome_plataforma      : fieldsArray['nome_plataforma'],
              empresa_responsavel  : fieldsArray['empresa_responsavel'],
              lancamento_plataforma :lancamento_plataforma,
              data_cadastro        : currentdate,
              tipo_plataforma      : fieldsArray['tipo_plataforma'],
              geracao_plataforma   : fieldsArray['geracao_plataforma'],
              tipomidia_plataforma : fieldsArray['tipomidia_plataforma'],
              site_plataforma      : fieldsArray['site_plataforma'],
              twitter_plataforma   : fieldsArray['twitter_plataforma'],
              facebook_plataforma  : fieldsArray['facebook_plataforma'],
              instagram_plataforma : fieldsArray['instagram_plataforma'],
              youtube_plataforma   : fieldsArray['youtube_plataforma'],
              nome_fonte           : fieldsArray['nome_fonte'],
              url_fonte            : fieldsArray['url_fonte'], 
              descricao_plataforma : fieldsArray['editor1'],
              url                  : title, 
              _criador             : req.user.id
            }

            var plataforma = new PlataformaModel(plataforma_data);
              plataforma.save(function(error, plat){

                if (error){
                  fs.remove(files['imagem'].path, function(err){
                              if (err) return console.error(err);

                            });
                  res.render('admin/cadastrarplataforma',{
                  user : req.user,
                  title: "Cadastre uma nova plataforma",
                  subtitle: "Cadastre uma nova plataforma no Mundo Gamer",
                  message:"Atenção, não foi possivel inserir."
                });

                }else{
                    var im = require('imagemagick');
                    im.crop({
                      srcPath: files['imagem'].path,
                      dstPath: saveTo,
                      width:   250,
                      height:  250,
                      strip: true
                    }, function(err, stdout, stderr){
                        if (err){
                           console.error(err);
                            fs.remove(files['imagem'].path, function(err){
                              if (err) return console.error(err);
                            });
                              res.render('admin/cadastrarplataforma',{
                              user : req.user,
                              title: "Cadastre um nova plataforma",
                              subtitle: "Cadastre uma nova plataforma no Mundo Gamer",
                              message:"Atenção!Plataforma cadastrada com erro ao fazer upload da logo."
                          });
                          }else{
                              fs.remove(files['imagem'].path, function(err){
                                if (err) return console.error(err);
                              });

                              im.crop({
                                srcPath: files['plataforma_banner01'].path,
                                dstPath: saveToBanner + "01",
                                width:   900,
                                height:  385,
                                strip: true
                              }, function(err, stdout, stderr){
                                  if (err){
                                     console.error(err);
                                      fs.remove(files['plataforma_banner01'].path, function(err){
                                        if (err) return console.error(err);


                                      });
                                      fs.remove(saveTo, function(err){
                                        if (err) return console.error(err);
                                      });
                                        res.render('admin/cadastrarplataforma',{
                                        user : req.user,
                                        title: "Cadastre um nova plataforma",
                                        subtitle: "Cadastre uma nova plataforma no Mundo Gamer",
                                        message:"Atenção!Plataforma cadastrada com erro ao fazer upload da logo."
                                    });
                                    }else{
                                        fs.remove(files['plataforma_banner01'].path, function(err){
                                          if (err) return console.error(err);
                                        });

                                        im.crop({
                                          srcPath: files['plataforma_banner02'].path,
                                          dstPath: saveToBanner + "02",
                                          width:   900,
                                          height:  385,
                                          strip: true
                                        }, function(err, stdout, stderr){
                                            if (err){
                                               console.error(err);
                                                fs.remove(files['plataforma_banner02'].path, function(err){
                                                  if (err) return console.error(err);
                                                });
                                                fs.remove(saveTo, function(err){
                                                  if (err) return console.error(err);
                                                });
                                                fs.remove(saveToBanner + "01", function(err){
                                                  if (err) return console.error(err);
                                                });
                                                  res.render('admin/cadastrarplataforma',{
                                                  user : req.user,
                                                  title: "Cadastre um nova plataforma",
                                                  subtitle: "Cadastre uma nova plataforma no Mundo Gamer",
                                                  message:"Atenção!Plataforma inserida com erro ao fazer upload da logo."
                                              });
                                              }else{
                                                  fs.remove(files['plataforma_banner02'].path, function(err){
                                                    if (err) return console.error(err);
                                                  });

                                                  res.render('admin/cadastrarplataforma',{
                                                            user : req.user,
                                                            title: "Cadastre um nova plataforma",
                                                            subtitle: "Cadastre uma nova plataforma no Mundo Gamer",
                                                            message:"Atenção!Plataforma inserida com sucesso."
                                                            });

                                                      var mailer = require("nodemailer");

                                                      // Use Smtp Protocol to send Email
                                                      var smtpTransport = mailer.createTransport("SMTP",{
                                                          host: "mx.mundogamer.com.br", // hostname
                                                          port: 587, // port for secure SMTP
                                                          auth: {
                                                              user: "contato@mundogamer.com.br",
                                                              pass: "asdf1234"
                                                          }
                                                      });

                                                      var mail = {
                                                          from: "Sistema Mundo Gamer <contato@mundogamer.com.br>",
                                                          to: "contato@mundogamer.com.br",
                                                          subject: "O usuário " + req.user.local.nome + " cadastrou uma nova plataforma",
                                                          //text: "Node.js New world for me",
                                                          html: "O usuário <b>" + req.user.local.nome + "</b> cadastrou uma nova plataforma no Mundo Gamer.<br><br> Confira os dados da publicação:<br><br>" +
                                                          //"Imagem de destaque: " + "<center><img" + noticia.capa + "/></center>" + "<br>" +
                                                          "<b>Nome da Plataforma:</b> " + plataforma_data.nome_plataforma + "<br>" +
                                                          "<b>Data de publicação:</b> " + plataforma_data.data_cadastro + "<br>" +
                                                          "<b>Tipo de plataforma:</b> " + plataforma_data.tipo_plataforma + "<br>" +
                                                          "<b>Descrição da plataforma:</b> " + plataforma_data.descricao_plataforma + "<br>"
                                                          
                                                      }

                                                      smtpTransport.sendMail(mail, function(error, response){
                                                          if(error){
                                                              console.log(error);
                                                          }else{
                                                              console.log("Message sent: " + response.message);
                                                          }

                                                          smtpTransport.close();
                                                      });


                                                  //Background
                                                  //  im.crop({
                                                  //   srcPath: files['jogo_banner02'].path,
                                                  //   dstPath: saveToBanner + "02",
                                                  //   width:   200,
                                                  //   height:  250,
                                                  //   strip: true
                                                  // }, function(err, stdout, stderr){
                                                  //     if (err){
                                                  //        console.error(err);
                                                  //         fs.remove(files['jogo_banner02'].path, function(err){
                                                  //           if (err) return console.error(err);
                                                  //         });
                                                  //         fs.remove(saveTo, function(err){
                                                  //           if (err) return console.error(err);
                                                  //         });
                                                  //         fs.remove(saveToBanner + "01", function(err){
                                                  //           if (err) return console.error(err);
                                                  //         });
                                                  //         fs.remove(saveToBanner + "02", function(err){
                                                  //           if (err) return console.error(err);
                                                  //         });
                                                  //           res.render('admin/cadastrarjogo',{
                                                  //           user : req.user,
                                                  //           title: "Cadastre um novo jogo",
                                                  //           subtitle: "Cadastre um novo jogo no Mundo Gamer",
                                                  //           message:"Atenção!Jogo inserido com erro ao fazer upload da logo."
                                                  //       });
                                                  //       }else{
                                                  //           fs.remove(files['jogo_banner02'].path, function(err){
                                                  //             if (err) return console.error(err);
                                                  //           });

                                                  //           res.render('admin/cadastrarjogo',{
                                                  //           user : req.user,
                                                  //           title: "Cadastre um novo jogo",
                                                  //           subtitle: "Cadastre um novo jogo no Mundo Gamer",
                                                  //           message:"Atenção!Jogo inserido com sucesso."
                                                  //           });
                                                  //         }  
                                                  // });
                                                }  
                                        });
                                      }  
                                  });
                                }  
                            });

            }
          });
        });
        form.parse(req);

}

//plataformas cadastradas
exports.plataformasCadastradas = function(req, res) {
  var PlataformaModel = require('../models/plataformas');
  var ObjectId = require('mongoose').Types.ObjectId; 


  PlataformaModel.find().sort({ nome_plataforma: 'asc'}).exec(function(err, plataformas){
    if (err)
          return console.error(err);


    res.render('admin/plataformascadastradas',  
          {
            user : req.user,
             plataformas : plataformas,
            title: "Plataformas cadastradas",
            subtitle: "Visualize todas as plataformas cadastradas no Mundo Gamer",
          });

  });
};

//Verificar pq não Funciona 
exports.editarPlataforma = function(req, res) {  
  console.log(req.params.id);
  var PlataformaModel = require('../models/plataformas');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
      PlataformaModel.findOne({_id: new ObjectId(req.params.id)}, function(err, plataforma) {
        if (err)
          return console.error(err);

        res.render('admin/editarplataforma', 
          {
            user : req.user,  
            plataforma: plataforma,
            title: "Editar plataforma " + plataforma.nome_plataforma,
            subtitle: "Edite os dados da plataforma",
            message: req.flash('loginMessage')
          });
      }).populate('_criador');
  }
};

//Verificar pq não Funciona 
exports.saveEditarPlataforma = function(req, res) {  
  console.log(req.params.id);
  var PlataformaModel = require('../models/plataformas');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
      var dataSepareted = req.body.lancamento_plataforma.split(" ");
             var date = dataSepareted[0].split("/");
             // var time = dataSepareted[1].split(":");
             var lancamento_plataforma = new Date(date[2]+ "." + date[1]+ "." + date[0]);;
           // var title = titleToUrl(req.body.nome_parceiro);


           var title = titleToUrlWiki(req.body.nome_plataforma);

            PlataformaModel.findByIdAndUpdate({_id: new ObjectId(req.params.id)},{ $set: {

            nome_plataforma         : req.body.nome_plataforma,
            empresa_responsavel     : req.body.empresa_responsavel, 
            lancamento_plataforma   : lancamento_plataforma,
            url                     : title,
            tipo_plataforma         : req.body.tipo_plataforma,
            geracao_plataforma      : req.body.geracao_plataforma,
            tipomidia_plataforma    : req.body.tipomidia_plataforma,
            site_plataforma         : req.body.site_plataforma,
            twitter_plataforma      : req.body.twitter_plataforma,
            facebook_plataforma     : req.body.facebook_plataforma,
            instagram_plataforma    : req.body.instagram_plataforma,
            youtube_plataforma      : req.body.youtube_plataforma,
            nome_fonte              :req.body.nome_fonte,
            url_fonte               :req.body.url_fonte,
            descricao_plataforma    : req.body.editor1,
            _criador                : req.user.id,

      }}, function(err, plataforma) {
        if (err){
          console.error(err);
          res.render('admin/editarplataforma', 
            {
              user : req.user,
              plataforma: plataforma, // get the user out of session and pass to template
              title: "Editar informações de " + plataforma.nome_plataforma,
              subtitle: "Edite os dados da plataforma",
              message: 'Erro ao salvar'
            });

        }else{
            res.render('admin/editarplataforma', 
            {
              user : req.user,
              plataforma: plataforma,// get the user out of session and pass to template
              title: "Editar informações de  " + plataforma.nome_plataforma,
              subtitle: "Edite os dados da plataforma",
              message: 'As informações foram alteradas com sucesso'
            });
        }

    });

        
  }
};

//salva o plataforma no banco de dados
exports.parceirosCadastrados = function(req, res) {
  var ParceiroModel = require('../models/parceiros');
  var ObjectId = require('mongoose').Types.ObjectId; 

  ParceiroModel.find().sort({ nome_parceiro: 'asc'}).exec(function(err, parceiros){
    if (err)
          return console.error(err);

    res.render('admin/parceiroscadastrados',  
          {
            user : req.user,
             parceiros : parceiros,
            title: "Parceiros cadastrados",
            subtitle: "Visualize todos os parceiros cadastrados no Mundo Gamer",
          });

  });
};

//salva o parceiro no banco de dados
exports.saveParceiro = function(req, res) {
        var ParceiroModel = require('../models/parceiros');
        var ObjectId = require('mongoose').Types.ObjectId; 
        var obid = new ObjectId();
        var path = require('path');
        var fs   = require('fs-extra')
        var formidable = require('formidable');
        var saveTo = path.join(__dirname.toString().replace('routes', '') + 'public/images/wikigamer/parceiros/logos', path.basename(obid));
        var saveToBanner = path.join(__dirname.toString().replace('routes', '') + 'public/images/wikigamer/parceiros/parceiros_banners', path.basename(obid));

        var form = new formidable.IncomingForm(),
        files = [],
        fieldsArray = [];

        form
          .on('error', function(err) {
            console.error(err);
          })
          .on('field', function(field, value) {
            fieldsArray[field]= value;
           
          })
          .on('file', function(field, file) {
            files[field] = file;
          })
          .on('end', function() {
             // var dataSepareted = fieldsArray['data_cadastro'].split(" ");
             // var date = dataSepareted[0].split("/");
             // var time = dataSepareted[1].split(":");
             //var data_cadastro = new Date(date[2]+ "." + date[1]+ "." + date[0]);;

            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();


            var title = titleToUrlWiki(fieldsArray['nome_parceiro']);

            var parceiro_data = {
              _id                : obid,
              nome_parceiro      : fieldsArray['nome_parceiro'],
              nome_responsavel     : fieldsArray['nome_responsavel'],
              email_contato      : fieldsArray['email_contato'],
              data_cadastro      : currentdate,
              url                : title,
              categoria          : fieldsArray['categoria'],
              descricao_parceiro : fieldsArray['editor1'],
              site               : fieldsArray['site'],
              twitter            : fieldsArray['twitter'],
              facebook           : fieldsArray['facebook'],
              instagram          : fieldsArray['instagram'],
              canal_youtube      : fieldsArray['canal_youtube'],
              _criador           : req.user.id
            }

            var parceiro = new ParceiroModel(parceiro_data);
              parceiro.save(function(error, parc){

                if (error){
                  fs.remove(files['logo'].path, function(err){
                              if (err) return console.error(err);

                            });
                  res.render('admin/cadastrarparceiro',{
                  user : req.user,
                  title: "Cadastre um novo parceiro",
                  subtitle: "Cadastre um novo parceiro Mundo Gamer",
                  message:"Atenção, não foi possivel inserir."
                });

                }else{
                    var im = require('imagemagick');
                    im.crop({
                      srcPath: files['logo'].path,
                      dstPath: saveTo,
                      width:   255,
                      height:  200,
                      strip: true
                    }, function(err, stdout, stderr){
                        if (err){
                           console.error(err);
                            fs.remove(files['logo'].path, function(err){
                              if (err) return console.error(err);


                            });
                              res.render('admin/cadastrarparceiro',{
                              user : req.user,
                              title: "Cadastre um novo parceiro",
                              subtitle: "Cadastre um novo parceiro Mundo Gamer",
                              message:"Atenção!Parceiro inserido com erro ao fazer upload da logo."
                          });
                          }else{
                              fs.remove(files['logo'].path, function(err){
                                if (err) return console.error(err);
                              });

                              im.crop({
                                srcPath: files['parceiro_banner01'].path,
                                dstPath: saveToBanner + "01",
                                width:   900,
                                height:  385,
                                strip: true
                              }, function(err, stdout, stderr){
                                  if (err){
                                     console.error(err);
                                      fs.remove(files['parceiro_banner01'].path, function(err){
                                        if (err) return console.error(err);


                                      });
                                      fs.remove(saveTo, function(err){
                                        if (err) return console.error(err);
                                      });
                                        res.render('admin/cadastrarparceiro',{
                                        user : req.user,
                                        title: "Cadastre um novo parceiro",
                                        subtitle: "Cadastre um novo parceiro Mundo Gamer",
                                        message:"Atenção!Parceiro inserido com erro ao fazer upload da logo."
                                    });
                                    }else{
                                        fs.remove(files['parceiro_banner01'].path, function(err){
                                          if (err) return console.error(err);
                                        });

                                        im.crop({
                                          srcPath: files['parceiro_banner02'].path,
                                          dstPath: saveToBanner + "02",
                                          width:   900,
                                          height:  385,
                                          strip: true
                                        }, function(err, stdout, stderr){
                                            if (err){
                                               console.error(err);
                                                fs.remove(files['parceiro_banner02'].path, function(err){
                                                  if (err) return console.error(err);
                                                });
                                                fs.remove(saveTo, function(err){
                                                  if (err) return console.error(err);
                                                });
                                                fs.remove(saveToBanner + "01", function(err){
                                                  if (err) return console.error(err);
                                                });
                                                  res.render('admin/cadastrarparceiro',{
                                                  user : req.user,
                                                  title: "Cadastre um novo parceiro",
                                                  subtitle: "Cadastre um novo parceiro Mundo Gamer",
                                                  message:"Atenção!Parceiro inserido com erro ao fazer upload da logo."
                                              });
                                              }else{
                                                  fs.remove(files['parceiro_banner02'].path, function(err){
                                                    if (err) return console.error(err);
                                                  });

                                                  res.render('admin/cadastrarparceiro',{
                                                            user : req.user,
                                                            title: "Cadastre um novo parceiro",
                                                            subtitle: "Cadastre um novo parceiro Mundo Gamer",
                                                            message:"Atenção!Parceiro inserido com sucesso."
                                                            });

                                                  //
                                                     var mailer = require("nodemailer");

                                                      // Use Smtp Protocol to send Email
                                                      var smtpTransport = mailer.createTransport("SMTP",{
                                                          host: "mx.mundogamer.com.br", // hostname
                                                          port: 587, // port for secure SMTP
                                                          auth: {
                                                              user: "contato@mundogamer.com.br",
                                                              pass: "asdf1234"
                                                          }
                                                      });

                                                      var mail = {
                                                          from: "Sistema Mundo Gamer <contato@mundogamer.com.br>",
                                                          to: "contato@mundogamer.com.br",
                                                          subject: "O usuário " + req.user.local.nome + " cadastrou um novo parceiro",
                                                          //text: "Node.js New world for me",
                                                          html: "O usuário <b>" + req.user.local.nome + "</b> cadastrou um novo parceiro no Mundo Gamer.<br><br> Confira os dados da publicação:<br><br>" +
                                                          //"Imagem de destaque: " + "<center><img" + noticia.capa + "/></center>" + "<br>" +
                                                          "<b>Nome do parceiro:</b> " + parceiro_data.nome_parceiro + "<br>" +
                                                          "<b>Data do cadastro:</b> " + parceiro_data.data_cadastro + "<br>" +
                                                          "<b>Nome do responsável:</b> " + parceiro_data.nome_responsavel + "<br>" +
                                                          "<b>Categoria:</b> " + parceiro_data.categoria + "<br>" +
                                                          "<b>Site oficial:</b> " + parceiro_data.site + "<br>" +
                                                          "<b>Descrição do parceiro:</b> " + parceiro_data.descricao_parceiro + "<br>"
                                                          
                                                      }

                                                      smtpTransport.sendMail(mail, function(error, response){
                                                          if(error){
                                                              console.log(error);
                                                          }else{
                                                              console.log("Message sent: " + response.message);
                                                          }

                                                          smtpTransport.close();
                                                      });


                                                  //  im.crop({
                                                  //   srcPath: files['jogo_banner02'].path,
                                                  //   dstPath: saveToBanner + "02",
                                                  //   width:   200,
                                                  //   height:  250,
                                                  //   strip: true
                                                  // }, function(err, stdout, stderr){
                                                  //     if (err){
                                                  //        console.error(err);
                                                  //         fs.remove(files['jogo_banner02'].path, function(err){
                                                  //           if (err) return console.error(err);
                                                  //         });
                                                  //         fs.remove(saveTo, function(err){
                                                  //           if (err) return console.error(err);
                                                  //         });
                                                  //         fs.remove(saveToBanner + "01", function(err){
                                                  //           if (err) return console.error(err);
                                                  //         });
                                                  //         fs.remove(saveToBanner + "02", function(err){
                                                  //           if (err) return console.error(err);
                                                  //         });
                                                  //           res.render('admin/cadastrarjogo',{
                                                  //           user : req.user,
                                                  //           title: "Cadastre um novo jogo",
                                                  //           subtitle: "Cadastre um novo jogo no Mundo Gamer",
                                                  //           message:"Atenção!Jogo inserido com erro ao fazer upload da logo."
                                                  //       });
                                                  //       }else{
                                                  //           fs.remove(files['jogo_banner02'].path, function(err){
                                                  //             if (err) return console.error(err);
                                                  //           });

                                                  //           res.render('admin/cadastrarjogo',{
                                                  //           user : req.user,
                                                  //           title: "Cadastre um novo jogo",
                                                  //           subtitle: "Cadastre um novo jogo no Mundo Gamer",
                                                  //           message:"Atenção!Jogo inserido com sucesso."
                                                  //           });
                                                  //         }  
                                                  // });
                                                }  
                                        });
                                      }  
                                  });
                                }  
                            });

            }
          });
        });
        form.parse(req);

}
//Verificar pq não Funciona 
exports.editarParceiro = function(req, res) {  
  console.log(req.params.id);
  var ParceiroModel = require('../models/parceiros');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
      ParceiroModel.findOne({_id: new ObjectId(req.params.id)}, function(err, parceiro) {
        if (err)
          return console.error(err);

        res.render('admin/editarparceiro', 
          {
            user : req.user,  
            parceiro: parceiro,
            title: "Editar informações de " + parceiro.nome_parceiro,
            subtitle: "Edite os dados de seu parceiro",
            message: req.flash('loginMessage')
          });
      }).populate('_criador');
  }
};

//Verificar pq não Funciona 
exports.saveEditarParceiro = function(req, res) {  
  console.log(req.params.id);
  var ParceiroModel = require('../models/parceiros');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {

            var title = titleToUrlWiki(req.body.nome_parceiro);

            ParceiroModel.findByIdAndUpdate({_id: new ObjectId(req.params.id)},{ $set: {

            nome_parceiro        : req.body.nome_parceiro,
            nome_responsavel     : req.body.nome_responsavel,
            email_contato        : req.body.email_contato, 
            url                  : title,
            categoria            : req.body.categoria,
            descricao_parceiro   : req.body.editor1,
              site               : req.body.site,
              twitter            : req.body.twitter,
              facebook           : req.body.facebook,
              instagram          : req.body.instagram,
              canal_youtube      : req.body.canal_youtube,
      }}, function(err, parceiro) {
        if (err){
          console.error(err);
          res.render('admin/editarparceiro', 
            {
              user : req.user,
              parceiro: parceiro, // get the user out of session and pass to template
              title: "Editar informações de " + parceiro.nome_parceiro,
              subtitle: "Edite os dados de seu parceiro",
              message: 'Erro ao salvar'
            });

        }else{
            res.render('admin/editarparceiro', 
            {
              user : req.user,
              parceiro: parceiro,// get the user out of session and pass to template
              title: "Editar informações de " + parceiro.nome_parceiro,
              subtitle: "Edite os dados de seu parceiro",
              message: 'As informações foram alteradas com sucesso'
            });
        }

    });

        
  }
};

//salva a noticia no banco de dados
exports.saveNoticia = function(req, res) {

        var NoticiaModel = require('../models/noticias');
        var ObjectId = require('mongoose').Types.ObjectId; 
        var obid = new ObjectId();
        var path = require('path');
        var fs   = require('fs-extra')
        var formidable = require('formidable');
        var saveTo = path.join(__dirname.toString().replace('routes', '') + 'public/images/noticia/capa', path.basename(obid));
        
        var form = new formidable.IncomingForm(),
        files = [],
        fieldsArray = [];

        form
          .on('error', function(err) {
            console.error(err);
          })
          .on('field', function(field, value) {
            fieldsArray[field]= value;
           
          })
          .on('file', function(field, file) {
            files[field] = file;
          })
          .on('end', function() {
             // var dataSepareted = fieldsArray['datainicio'].split(" ");
             // var date = dataSepareted[0].split("/");
             // var time = dataSepareted[1].split(":");
             // var datainicio = new Date(date[2]+ "." + date[1]+ "." + date[0]);;
             // datainicio.setHours(time[0],time[1],time[2],0);

            var title = titleToUrl(fieldsArray['titulo']);

            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();


            var noticia_data = {
              _id         : obid,
              tipo        : "Noticia",
              url         : title,
              parceiro    : fieldsArray['parceiro'],
              titulo      : fieldsArray['titulo'],
              data        : currentdate,
              descricao   : fieldsArray['editor1'],
              src         : fieldsArray['src'],
              url_fonte   :fieldsArray['url_fonte'],
              nome_fonte   :fieldsArray['nome_fonte'],
              _criador    : req.user.id
            }

            var noticia = new NoticiaModel(noticia_data);
              noticia.save(function(error, noti){

                if (error){
                  fs.remove(files['capa'].path, function(err){
                              if (err) return console.error(err);

                            });
                  res.render('admin/novanoticia',{
                  user : req.user,
                  title: "Nova Notícia",
                  subtitle: "Cadastre sua notícia no Mundo Gamer",
                  message:"Atenção, não foi possivel inserir."
                });

                }else{
                    var im = require('imagemagick');
                    im.crop({
                      srcPath: files['capa'].path,
                      dstPath: saveTo,
                      width:   300,
                      height:  200,
                      strip: true
                    }, function(err, stdout, stderr){
                        if (err){
                           console.error(err);
                            fs.remove(files['capa'].path, function(err){
                              if (err) return console.error(err);


                            });
                            res.render('admin/novanoticia',{
                              user : req.user,
                              title: "Nova Notícia",
                              subtitle: "Cadastre sua notícia no Mundo Gamer",
                              message:"Atenção! Noticia inserida com erro ao fazer upload da Capa."
                          });
                          }else{
                              fs.remove(files['capa'].path, function(err){
                                if (err) return console.error(err);
                              });

                              res.render('admin/novanoticia',{
                                user : req.user,
                                title: "Nova Notícia",
                                subtitle: "Cadastre sua notícia no Mundo Gamer",
                                message:"Notícia cadastrada com sucesso"
                              });

                              var mailer = require("nodemailer");

                                // Use Smtp Protocol to send Email
                                var smtpTransport = mailer.createTransport("SMTP",{
                                    host: "mx.mundogamer.com.br", // hostname
                                    port: 587, // port for secure SMTP
                                    auth: {
                                        user: "contato@mundogamer.com.br",
                                        pass: "asdf1234"
                                    }
                                });

                                var mail = {
                                    from: "Sistema Mundo Gamer <contato@mundogamer.com.br>",
                                    to: "contato@mundogamer.com.br",
                                    subject: "O usuário " + req.user.local.nome + " cadastrou uma nova publicação",
                                    //text: "Node.js New world for me",
                                    html: "O usuário <b>" + req.user.local.nome + "</b> cadastrou uma nova publicação no Mundo Gamer.<br><br> Confira os dados da publicação:<br><br>" +
                                    "Imagem de destaque: " + "<center><img" + noticia.capa + "/></center>" + "<br>" +
                                    "<b>Título da publicação:</b> " + noticia_data.titulo + "<br>" +
                                    "<b>Data de publicação:</b> " + noticia_data.data + "<br>" +
                                    "<b>Parceiro da publicação:</b> " + noticia_data.parceiro + "<br>" +
                                    "<b>Descrição da publicação:</b> " + noticia_data.descricao + "<br>"
                                    
                                }

                                smtpTransport.sendMail(mail, function(error, response){
                                    if(error){
                                        console.log(error);
                                    }else{
                                        console.log("Message sent: " + response.message);
                                    }

                                    smtpTransport.close();
                                });


                            //   FB.api(
                            //     "/{}/feed",
                            //     "POST",
                            //     {
                            //         "message": "This is a test message"
                            //     },
                            //     function (response) {
                            //       if (response && !response.error) {
                            //         /* handle the result */
                            //       }
                            //     }
                            // );

                            }  
              });

            }
          });
        });
        form.parse(req);
}

exports.saveEditarNoticia = function(req, res) {  
  console.log(req.params.id);
  var NoticiaModel = require('../models/noticias');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {

            var title = titleToUrl(req.body.titulo);

      NoticiaModel.findByIdAndUpdate({_id: new ObjectId(req.params.id)},{ $set: {
            titulo      : req.body.titulo,
            url         : title, 
            tipo        : "Noticia",
            parceiro    : req.body.parceiro,
            descricao   : req.body.editor1,
            src         : req.body.src,
            nome_fonte  :req.body.nome_fonte,
            url_fonte  :req.body.url_fonte
      }}, function(err, noticia) {
        if (err){
          console.error(err);
          res.render('admin/editarnoticia', 
            {
              user : req.user,
              noticia : noticia, // get the user out of session and pass to template
              title: "Editar publicação ",
              subtitle: "Edite os dados de sua publicação",
              message: 'Erro ao salvar'
            });

        }else{
            res.render('admin/editarnoticia', 
            {
              user : req.user,
              noticia : noticia, // get the user out of session and pass to template
              title: "Editar publicação ",
              subtitle: "Edite os dados de sua publicação",
              message: 'Publicação editada com sucesso'
            });
        }

    });

        
  }
};

exports.editarNoticia = function(req, res) {  
  console.log(req.params.id);
  var NoticiaModel = require('../models/noticias');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
      NoticiaModel.findOne({_id: new ObjectId(req.params.id)}, function(err, noticia) {
        if (err)
          return console.error(err);

        res.render('admin/editarnoticia', 
          {
            user : req.user,
            noticia : noticia, // get the user out of session and pass to template
            title: "Editar publicação ",
            subtitle: "Edite os dados de sua publicação",
            message: req.flash('loginMessage')
          });
      }).populate('_criador');
  }
};

//salva a nova analise no banco de dados
exports.saveAnalise = function(req, res) {

        var NoticiaModel = require('../models/noticias');
        var ObjectId = require('mongoose').Types.ObjectId; 
        var obid = new ObjectId();
        var path = require('path');
        var fs   = require('fs-extra')
        var formidable = require('formidable');
        var saveTo = path.join(__dirname.toString().replace('routes', '') + 'public/images/noticia/capa', path.basename(obid));
        
        var form = new formidable.IncomingForm(),
        files = [],
        fieldsArray = [];

        form
          .on('error', function(err) {
            console.error(err);
          })
          .on('field', function(field, value) {
            fieldsArray[field]= value;
           
          })
          .on('file', function(field, file) {
            files[field] = file;
          })
          .on('end', function() {
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();


            var title = titleToUrl(fieldsArray['titulo']);

            var noticia_data = {
              _id         : obid,
              tipo        : "Análise",
              url         : title,
              parceiro    : fieldsArray['parceiro'],
              titulo      : fieldsArray['titulo'],
              data        : currentdate,
              descricao   : fieldsArray['editor1'],
              
              _criador    : req.user.id
            }

            var noticia = new NoticiaModel(noticia_data);
              noticia.save(function(error, noti){

                if (error){
                  fs.remove(files['capa'].path, function(err){
                              if (err) return console.error(err);

                            });
                  res.render('admin/novaanalise',{
                  user : req.user,
                  title: "Nova Análise",
                  subtitle: "Cadastre sua análise de jogo ou plataforma",
                  message:"Atenção, não foi possivel inserir."
                });

                }else{
                    var im = require('imagemagick');
                    im.crop({
                      srcPath: files['capa'].path,
                      dstPath: saveTo,
                      width:   300,
                      height:  200,
                      strip: true
                    }, function(err, stdout, stderr){
                        if (err){
                           console.error(err);
                            fs.remove(files['capa'].path, function(err){
                              if (err) return console.error(err);


                            });
                            res.render('admin/novaanalise',{
                              user : req.user,
                              title: "Nova Análise",
                              subtitle: "Cadastre sua análise de jogo ou plataforma",
                              message:"Atenção! Análise inserida com erro ao fazer upload da Capa."
                          });
                          }else{
                              fs.remove(files['capa'].path, function(err){
                                if (err) return console.error(err);
                              });

                              res.render('admin/novaanalise',{
                                user : req.user,
                                title: "Nova Análise",
                                subtitle: "Cadastre sua análise de jogo ou plataforma",
                                message:"Análise cadastrada com sucesso"
                              });
                            }  
              });

            }
          });
        });
        form.parse(req);
}

exports.saveEditarAnalise = function(req, res) {  
  console.log(req.params.id);
  var NoticiaModel = require('../models/noticias');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {

            var title = titleToUrl(req.body.titulo);

      NoticiaModel.findByIdAndUpdate({_id: new ObjectId(req.params.id)},{ $set: {
            titulo      : req.body.titulo,
            url         : title, 
            parceiro    : req.body.parceiro,
            descricao   : req.body.editor1,

      }}, function(err, noticia) {
        if (err){
          console.error(err);
          res.render('admin/editaranalise', 
            {
              user : req.user,
              noticia : noticia, // get the user out of session and pass to template
              title: "Editar as informações de sua análise ",
              subtitle: "Edite os dados de sua análise",
              message: 'Erro ao salvar'
            });

        }else{
            res.render('admin/editaranalise', 
            {
              user : req.user,
              noticia : noticia, // get the user out of session and pass to template
              title: "Editar as informações de sua análise",
              subtitle: "Edite os dados de sua análise",
              message: 'As informações foram alteradas com sucesso'
            });
        }

    });

        
  }
};

exports.editarAnalise = function(req, res) {  
  console.log(req.params.id);
  var NoticiaModel = require('../models/noticias');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
      NoticiaModel.findOne({_id: new ObjectId(req.params.id)}, function(err, noticia) {
        if (err)
          return console.error(err);

        res.render('admin/editaranalise', 
          {
            user : req.user,
            noticia : noticia, // get the user out of session and pass to template
            title: "Editar análise ",
            subtitle: "Edite os dados de sua análise",
            message: req.flash('loginMessage')
          });
      }).populate('_criador');
  }
};

//salva um vídeo no banco de dados
exports.saveVideo = function(req, res) {

        var NoticiaModel = require('../models/noticias');
        var ObjectId = require('mongoose').Types.ObjectId; 
        var obid = new ObjectId();
        var path = require('path');
        var fs   = require('fs-extra')
        var formidable = require('formidable');
        var saveTo = path.join(__dirname.toString().replace('routes', '') + 'public/images/noticia/capa', path.basename(obid));
        
        var form = new formidable.IncomingForm(),
        files = [],
        fieldsArray = [];

        form
          .on('error', function(err) {
            console.error(err);
          })
          .on('field', function(field, value) {
            fieldsArray[field]= value;
           
          })
          .on('file', function(field, file) {
            files[field] = file;
          })
          .on('end', function() {
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

            var title = titleToUrl(fieldsArray['titulo']);

            var noticia_data = {
              _id         : obid,
              url         : title,
              tipo        : fieldsArray['tipo'],
              parceiro    : fieldsArray['parceiro'],
              titulo      : fieldsArray['titulo'],
              data        : currentdate,
              descricao   : fieldsArray['editor1'],
              src         : fieldsArray['src'],
              url_fonte   :fieldsArray['url_fonte'],
              nome_fonte  :fieldsArray['nome_fonte'],
              _criador    : req.user.id
            }

            var noticia = new NoticiaModel(noticia_data);
              noticia.save(function(error, noti){

                if (error){
                  fs.remove(files['capa'].path, function(err){
                              if (err) return console.error(err);

                            });
                  res.render('admin/novovideo',{
                  user : req.user,
                  title: "Publique um vídeo no Mundo Gamer",
                  subtitle: "Cadastre seu vídeo Mundo Gamer",
                  message:"Atenção, não foi possivel inserir."
                });

                }else{
                    var im = require('imagemagick');
                    im.crop({
                      srcPath: files['capa'].path,
                      dstPath: saveTo,
                      width:   300,
                      height:  200,
                      strip: true
                    }, function(err, stdout, stderr){
                        if (err){
                           console.error(err);
                            fs.remove(files['capa'].path, function(err){
                              if (err) return console.error(err);


                            });
                            res.render('admin/novovideo',{
                              user : req.user,
                              title: "Publique um vídeo no Mundo Gamer",
                              subtitle: "Cadastre seu vídeo Mundo Gamer",
                              message:"Atenção! Noticia inserida com erro ao fazer upload da Capa."
                          });
                          }else{
                              fs.remove(files['capa'].path, function(err){
                                if (err) return console.error(err);
                              });

                              res.render('admin/novovideo',{
                                user : req.user,
                                title: "Publique um vídeo no Mundo Gamer",
                                subtitle: "Cadastre seu vídeo Mundo Gamer",
                                message:"O seu vídeo foi cadastrado com sucesso!"
                              });

                                var mailer = require("nodemailer");

                                // Use Smtp Protocol to send Email
                                var smtpTransport = mailer.createTransport("SMTP",{
                                    host: "mx.mundogamer.com.br", // hostname
                                    port: 587, // port for secure SMTP
                                    auth: {
                                        user: "contato@mundogamer.com.br",
                                        pass: "asdf1234"
                                    }
                                });

                                var mail = {
                                    from: "Sistema Mundo Gamer <contato@mundogamer.com.br>",
                                    to: "contato@mundogamer.com.br",
                                    subject: "O usuário " + req.user.local.nome + " cadastrou um novo vídeo",
                                    //text: "Node.js New world for me",
                                    html: "O usuário <b>" + req.user.local.nome + "</b> cadastrou um novo video no Mundo Gamer.<br><br> Confira os dados da publicação:<br><br>" +
                                    //"Imagem de destaque: " + "<center><img" + noticia.capa + "/></center>" + "<br>" +
                                    "<b>Título da publicação:</b> " + noticia_data.titulo + "<br>" +
                                    "<b>Data de publicação:</b> " + noticia_data.data + "<br>" +
                                    "<b>Tipo de vídeo:</b> " + noticia_data.tipo + "<br>" +
                                    "<b>Parceiro da publicação:</b> " + noticia_data.parceiro + "<br>" +
                                    "<b>Descrição da publicação:</b> " + noticia_data.descricao + "<br>"
                                    
                                }

                                smtpTransport.sendMail(mail, function(error, response){
                                    if(error){
                                        console.log(error);
                                    }else{
                                        console.log("Message sent: " + response.message);
                                    }

                                    smtpTransport.close();
                                });

                            }  
              });

            }
          });
        });
        form.parse(req);
}

exports.saveEditarVideo = function(req, res) {  
  console.log(req.params.id);
  var NoticiaModel = require('../models/noticias');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {

            var title = titleToUrl(req.body.titulo);

            NoticiaModel.findByIdAndUpdate({_id: new ObjectId(req.params.id)},{ $set: {
            titulo      : req.body.titulo,
            url         : title, 
            parceiro    : req.body.parceiro,
            tipo        : req.body.tipo,
            descricao   : req.body.editor1,
            nome_fonte  : req.body.nome_fonte,
            url_fonte   : req.body.url_fonte,

      }}, function(err, noticia) {
        if (err){
          console.error(err);
          res.render('admin/editarvideo', 
            {
              user : req.user,
              noticia : noticia, // get the user out of session and pass to template
              title: "Editar as informações de seu vídeo ",
              subtitle: "Edite os dados do vídeo cadastrado",
              message: 'Erro ao salvar'
            });

        }else{
            res.render('admin/editarvideo', 
            {
              user : req.user,
              noticia : noticia, // get the user out of session and pass to template
              title: "Editar as informações de seu vídeo",
              subtitle: "Edite os dados do vídeo cadastrado",
              message: 'As informações foram alteradas com sucesso'
            });
        }

    });

        
  }
};



exports.editarVideo = function(req, res) {  
  console.log(req.params.id);
  var NoticiaModel = require('../models/noticias');
  var ObjectId = require('mongoose').Types.ObjectId; 
  if(typeof req.params.id !== 'undefined') {
      NoticiaModel.findOne({_id: new ObjectId(req.params.id)}, function(err, noticia) {
        if (err)
          return console.error(err);

        res.render('admin/editarvideo', 
          {
            user : req.user,
            noticia : noticia, // get the user out of session and pass to template
            title: "Editar as informações de seu vídeo",
            subtitle: "Edite os dados do vídeo cadastrado",
            message: req.flash('loginMessage')
          });
      }).populate('_criador');
  }
};

// //Cadastro de Cobertura de eventos
// exports.saveCobertura = function(req, res) {
//         var CoberturaModel = require('../models/coberturas');
//         var ObjectId = require('mongoose').Types.ObjectId; 
//         var obid = new ObjectId();
//         var path = require('path');
//         var fs   = require('fs-extra')
//         var formidable = require('formidable');
//         var saveTo = path.join(__dirname.toString().replace('routes', '') + 'public/images/wikigamer/coberturas/capas', path.basename(obid));

//         var form = new formidable.IncomingForm(),
//         files = [],
//         fieldsArray = [];
        
//         form
//           .on('error', function(err) {
//             console.error(err);
//           })
//           .on('field', function(field, value) {
//             fieldsArray[field]= value;
           
//           })
//           .on('file', function(field, file) {
//             files[field] = file;
//           })
//           .on('end', function() {

//             var title = titleToUrlWiki(fieldsArray['nome_evento']);

//             var cobertura_data = {
//               _id         : obid,

//               url         : title,
//               nome_evento : fieldsArray['nome_evento'],
//               descricao   : fieldsArray['editor1'],

//               _criador    : req.user.id
//             }

//             var cobertura = new CoberturaModel(cobertura_data);
//               cobertura.save(function(error, cobe){

//                 if (error){
//                   fs.remove(files['imagem'].path, function(err){
//                               if (err) return console.error(err);

//                             });
//                   res.render('admin/cadastrarcobertura',{
//                   user : req.user,
//                   title: "Nova Cobertura de evento",
//                   subtitle: "Cadastre um novo evento para cobertura",
//                   message:"Atenção, não foi possivel inserir."
//                 });

//                 }else{
//                     var im = require('imagemagick');
//                     im.crop({
//                       srcPath: files['imagem'].path,
//                       dstPath: saveTo,
//                       width:   300,
//                       height:  200,
//                       strip: true
//                     }, function(err, stdout, stderr){
//                         if (err){
//                            console.error(err);
//                             fs.remove(files['imagem'].path, function(err){
//                               if (err) return console.error(err);


//                             });
//                             res.render('admin/cadastrarcobertura',{
//                               user : req.user,
//                               title: "Nova Cobertura de evento",
//                               subtitle: "Cadastre sua notícia no Mundo Gamer",
//                               message:"Atenção! Cobertura de evento com erro ao fazer upload da Capa."
//                           });
//                           }else{
//                               fs.remove(files['imagem'].path, function(err){
//                                 if (err) return console.error(err);
//                               });

//                               res.render('admin/cadastrarcobertura',{
//                                 user : req.user,
//                                 title: "Nova Cobertura de evento",
//                                 subtitle: "Cadastre um novo evento para cobertura",
//                                 message:"Cobertura de evento cadastrada com sucesso"
//                               });

//                             }  
//               });

//             }
//           });
//         });
//         form.parse(req);
// }

// // //Ṕersonagens cadastradas
// exports.coberturasCadastradas = function(req, res) {
//   var CoberturaModel = require('../models/coberturas');
//   var ObjectId = require('mongoose').Types.ObjectId; 


//   CoberturaModel.find().sort({ nome_evento: 'asc'}).exec(function(err, coberturas){
//     if (err)
//           return console.error(err);


//     res.render('admin/coberturascadastradas',  
//           {
//             user : req.user,
//             coberturas : coberturas,
//             title: "Coberturas de eventos cadastradas",
//             subtitle: "Visualize todos os eventos para coberturas cadastrados no Mundo Gamer",
//           });

//   });
// };

// exports.editarCobertura = function(req, res) {  
//   console.log(req.params.id);
//   var CoberturaModel = require('../models/coberturas');
//   var ObjectId = require('mongoose').Types.ObjectId; 
//   if(typeof req.params.id !== 'undefined') {
//       CoberturaModel.findOne({_id: new ObjectId(req.params.id)}, function(err, cobertura) {
//         if (err)
//           return console.error(err);

//         res.render('admin/editarcobertura', 
//           {
//             user : req.user,  
//             cobertura : cobertura,
//             title: "Editar informações de cobertuda do evento " + cobertura.nome_evento,
//             subtitle: "Edite os dados do evento",
//             message: req.flash('loginMessage')
//           });
//       }).populate('_criador');
//   }
// };

// // //Verificar pq não Funciona 
// exports.saveEditarCobertura = function(req, res) {  
//   console.log(req.params.id);
//   var CoberturaModel = require('../models/coberturas');
//   var ObjectId = require('mongoose').Types.ObjectId; 
//   if(typeof req.params.id !== 'undefined') {
        
//            var title = titleToUrlWiki(req.body.nome_evento);

//             CoberturaModel.findByIdAndUpdate({_id: new ObjectId(req.params.id)},{ $set: {

//             nome_evento  : req.body.nome_evento,
//             url          : title,
//             descricao    : req.body.editor1,
//             _criador     : req.user.id,

//       }}, function(err, cobertura) {
//         if (err){
//           console.error(err);
//           res.render('admin/editarcobertura', 
//             {
//               user : req.user,
//               cobertura : cobertura, // get the user out of session and pass to template
//               title: "Editar informações do evento " + cobertura.nome_evento,
//               subtitle: "Edite os dados do evento",
//               message: 'Erro ao salvar'
//             });

//         }else{
//             res.render('admin/editarcobertura', 
//             {
//               user : req.user,
//               cobertura : cobertura,// get the user out of session and pass to template
//               title: "Editar informações do evento " + cobertura.nome_evento,
//               subtitle: "Edite os dados do evento",
//               message: 'As informações foram alteradas com sucesso'
//             });
//         }

//     });

        
//   }
// };

//Fim do cadastro de cobertura de eventos

function saveImage (req,res,saveTo,name){

var Busboy = require('busboy');
var fs = require('fs');
var os = require('os');

 // Instanciamos o Busboy com as headers
    // recebidas na requisição
    var busboy = new Busboy({headers : req.headers});

    // Escutamos por erros e passamos adiante
    busboy.on('error', function(err){
       le.error(err);
    });

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

      var extensao = filename.split('.').pop().toLowerCase();

      var permitido = ['png', 'gif', 'jpg'].some(function(ext){
        // A extensão está na lista?
        return ext === extensao;
      });

      if(!permitido)
        res.send('Arquivo não permitido.');


//      var saveTo = path.join(__dirname.toString().replace('routes', '') + 'public/images/noticia', path.basename(name));
      file.pipe(fs.createWriteStream(saveTo));
    });

    busboy.on('finish', function(){

        html = "";
        html += "<script type='text/javascript'>";
        html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
        html += "    var url     = \"/images/noticia/" + name + "\";";
        html += "    var message = \"Arquivo enviado com sucesso!\";";
        html += "";
        html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
        html += "</script>";

        res.send(html);
    });

    // Não esquecer de mandar a requisição para o Busboy
    req.pipe(busboy);
}

function removeSpecialCharSimple(strToReplace) {
    strSChar = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
    strNoSChars = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
    var newStr = "";
    for (var i = 0; i < strToReplace.length; i++) {
        if (strSChar.indexOf(strToReplace.charAt(i)) != -1) {
            newStr += strNoSChars.substr(strSChar.search(strToReplace.substr(i,1)),1);
        } else {
            newStr += strToReplace.substr(i,1);
        }
    }
    return newStr;
}

 
function titleToUrl(str){
  str = removeSpecialCharSimple(str);
  str = str.replace(/ /gi, '-');
  str = str.toLowerCase();
  console.log("Titulo " + str);
  return str;    
}

function titleToUrlWiki(str){
  str = removeSpecialCharSimple(str);
  str = str.replace(/ /gi, '');
  str = str.toLowerCase();
  console.log("Titulo " + str);
  return str;    
}

exports.loadParceiros = function(req, res) {
    var ParceiroModel = require('../models/parceiros');
    //var nome = req.route.params.nome;
     var nome = req.query.nome; 
     var re = new RegExp(nome, 'i')
     console.log("nome " + nome);

    ParceiroModel.find( {nome_parceiro: {$regex:re} }).exec(function (err, parceiros) {
    if (err)
      return console.error(err);

    res.json(parceiros);

  });

  }

exports.loadJogos = function(req, res) {
    var JogoModel = require('../models/jogos');
    //var nome = req.route.params.nome;
     var nome = req.query.nome; 
     var re = new RegExp(nome, 'i')
     console.log("nome " + nome);

    JogoModel.find( {nome_jogo: {$regex:re} }).exec(function (err, jogos) {
    if (err)
      return console.error(err);

    res.json(jogos);

  });

  }

exports.loadCategories = function(req, res) {
    var CategoriaModel = require('../models/categorias');
    //var nome = req.route.params.nome;
     var nome = req.query.nome; 
     var re = new RegExp(nome, 'i')
     console.log("nome " + nome);

    CategoriaModel.find( {nome_categoria: {$regex:re} }).exec(function (err, categorias) {
    if (err)
      return console.error(err);
    var newData = [];
    for (var i = 0, len=categorias.length; i<len;i++) {
      newData.push(categorias[i].nome_categoria)

    }
    console.log(newData);
    res.json(newData);

  });

  }

exports.loadPlataformas = function(req, res) {
    var PlataformaModel = require('../models/plataformas');
    //var nome = req.route.params.nome;
     var nome = req.query.nome; 
     var re = new RegExp(nome, 'i')
     console.log("nome " + nome);

    PlataformaModel.find( {nome_plataforma: {$regex:re} }).exec(function (err, plataformas) {
    if (err)
      return console.error(err);
    var newData = [];
    for (var i = 0, len=plataformas.length; i<len;i++) {
      newData.push(plataformas[i].nome_plataforma)

    }
    console.log(newData);
    res.json(newData);

  });

  }

  exports.loadMidias = function(req, res) {
    var MidiaModel = require('../models/midias');
    //var nome = req.route.params.nome;
     var nome = req.query.nome; 
     var re = new RegExp(nome, 'i')
     console.log("nome " + nome);

    MidiaModel.find( {nome_midia: {$regex:re} }).exec(function (err, midias) {
    if (err)
      return console.error(err);
    var newData = [];
    for (var i = 0, len=midias.length; i<len;i++) {
      newData.push(midias[i].nome_midia)

    }
    console.log(newData);
    res.json(newData);

  });

  }

    exports.loadCategoriaEmpresas = function(req, res) {
    var CategoriaEmpresaModel = require('../models/categoriaempresas');
    //var nome = req.route.params.nome;
     var nome = req.query.nome; 
     var re = new RegExp(nome, 'i')
     console.log("nome " + nome);

    CategoriaEmpresaModel.find( {nome_categoria: {$regex:re} }).exec(function (err, categoriaempresas) {
    if (err)
      return console.error(err);
    var newData = [];
    for (var i = 0, len=categoriaempresas.length; i<len;i++) {
      newData.push(categoriaempresas[i].nome_categoria)

    }
    console.log(newData);
    res.json(newData);

  });

  }

    exports.loadEmpresas = function(req, res) {
    var EmpresaModel = require('../models/empresas');
    //var nome = req.route.params.nome;
     var nome = req.query.nome; 
     var re = new RegExp(nome, 'i')
     console.log("nome " + nome);

    EmpresaModel.find( {nome_empresa: {$regex:re} }).exec(function (err, empresas) {
    if (err)
      return console.error(err);
    var newData = [];
    for (var i = 0, len=empresas.length; i<len;i++) {
      newData.push(empresas[i].nome_empresa)

    }
    console.log(newData);
    res.json(newData);

  });

  }

  exports.loadPersonagens = function(req, res) {
    var PersonagemModel = require('../models/personagens');
    //var nome = req.route.params.nome;
     var nome = req.query.nome; 
     var re = new RegExp(nome, 'i')
     console.log("nome " + nome);

    PersonagemModel.find( {nome_plataforma: {$regex:re} }).exec(function (err, personagens) {
    if (err)
      return console.error(err);

    res.json(personagens);

  });

  }