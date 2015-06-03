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

exports.novaCategoria = function(req, res) {  
  res.render('admin/cadastrarcategoria',{
          user : req.user,
          title: "Cadastre uma nova categoria",
          subtitle: "Cadastre uma nova categoria de jogos no Mundo Gamer",
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

      NoticiaModel.find({'_criador': new ObjectId(req.user.id)}).sort({ data: 'desc'}).exec(function(err, noticias) {
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
      NoticiaModel.find({'_criador': new ObjectId(req.user.id)}).sort({ data: 'desc'}).exec(function(err, noticias) {
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
      NoticiaModel.find().sort({ data: 'desc'}).exec(function(err, noticias) {
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
  res.redirect('/mg-admin/login');
  
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

            var categoria_data = {
              _id                  : obid,
              nome_categoria       : fieldsArray['nome_categoria'],
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
            //  data_lancamento.setHours(time[0],time[1],time[2],0);

            // dataSepareted = fieldsArray['datafinal'].split(" ");
            // date = dataSepareted[0].split("/");
            // time = dataSepareted[1].split(":");
            // var datafinal = new Date(date[2]+ "." + date[1]+ "." + date[0]);;
            // datafinal.setHours(time[0],time[1],time[2],0);
            // console.log("descricao " + fieldsArray['editor1']); */
            //var title = titleToUrl(fieldsArray['nome_parceiro']);


            var title = titleToUrlWiki(fieldsArray['nome_personagem']);
            // var now = new Date();

            var personagem_data = {
              _id                      : obid,
              nome_personagem          : fieldsArray['nome_personagem'],
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
      });
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
             var data_lancamento = new Date(date[2]+ "." + date[1]+ "." + date[0]);;
            //  data_lancamento.setHours(time[0],time[1],time[2],0);

            // dataSepareted = fieldsArray['datafinal'].split(" ");
            // date = dataSepareted[0].split("/");
            // time = dataSepareted[1].split(":");
            // var datafinal = new Date(date[2]+ "." + date[1]+ "." + date[0]);;
            // datafinal.setHours(time[0],time[1],time[2],0);
            // console.log("descricao " + fieldsArray['editor1']); */
            //var title = titleToUrl(fieldsArray['nome_parceiro']);


            var title = titleToUrlWiki(fieldsArray['nome_jogo']);
            // var now = new Date();

            var jogo_data = {
              _id                : obid,
              nome_jogo          : fieldsArray['nome_jogo'],
              desenvolvedor      : fieldsArray['desenvolvedor'],
              editora            : fieldsArray['editora'],
              data_lancamento    : data_lancamento,
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
                              fs.remove(files['capa_jogo'].path, function(err){
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
      });
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
             //var data_cadastro = new Date(date[2]+ "." + date[1]+ "." + date[0]);;
             //data_cadastro.setHours(time[0],time[1],time[2],0);

            // dataSepareted = fieldsArray['datafinal'].split(" ");
            // date = dataSepareted[0].split("/");
            // time = dataSepareted[1].split(":");
            // var datafinal = new Date(date[2]+ "." + date[1]+ "." + date[0]);;
            // datafinal.setHours(time[0],time[1],time[2],0);
            // console.log("descricao " + fieldsArray['editor1']); */

            var title = titleToUrlWiki(fieldsArray['nome_plataforma']);
            


            var plataforma_data = {
              _id                  : obid,
              nome_plataforma      : fieldsArray['nome_plataforma'],
              empresa_responsavel  : fieldsArray['empresa_responsavel'],
              lancamento_plataforma :lancamento_plataforma,
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
      });
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
             var dataSepareted = fieldsArray['data_cadastro'].split(" ");
             var date = dataSepareted[0].split("/");
             // var time = dataSepareted[1].split(":");
             var data_cadastro = new Date(date[2]+ "." + date[1]+ "." + date[0]);;

            var title = titleToUrlWiki(fieldsArray['nome_parceiro']);

            var parceiro_data = {
              _id                : obid,
              nome_parceiro      : fieldsArray['nome_parceiro'],
              email_contato      : fieldsArray['email_contato'],
              data_cadastro      : data_cadastro,
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
      });
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
             var dataSepareted = fieldsArray['datainicio'].split(" ");
             var date = dataSepareted[0].split("/");
             var time = dataSepareted[1].split(":");
             var datainicio = new Date(date[2]+ "." + date[1]+ "." + date[0]);;
             datainicio.setHours(time[0],time[1],time[2],0);

            var title = titleToUrl(fieldsArray['titulo']);

            var noticia_data = {
              _id         : obid,
              tipo        : "Noticia",
              url         : title,
              parceiro    : fieldsArray['parceiro'],
              titulo      : fieldsArray['titulo'],
              data        : datainicio,
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
      });
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
             var dataSepareted = fieldsArray['datainicio'].split(" ");
             var date = dataSepareted[0].split("/");
             var time = dataSepareted[1].split(":");
             var datainicio = new Date(date[2]+ "." + date[1]+ "." + date[0]);;
             datainicio.setHours(time[0],time[1],time[2],0);


            var title = titleToUrl(fieldsArray['titulo']);

            var noticia_data = {
              _id         : obid,
              tipo        : "Análise",
              url         : title,
              parceiro    : fieldsArray['parceiro'],
              titulo      : fieldsArray['titulo'],
              data        : datainicio,
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
      });
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
             var dataSepareted = fieldsArray['datainicio'].split(" ");
             var date = dataSepareted[0].split("/");
             var time = dataSepareted[1].split(":");
             var datainicio = new Date(date[2]+ "." + date[1]+ "." + date[0]);;
             datainicio.setHours(time[0],time[1],time[2],0);

            var title = titleToUrl(fieldsArray['titulo']);

            var noticia_data = {
              _id         : obid,
              url         : title,
              tipo        : fieldsArray['tipo'],
              parceiro    : fieldsArray['parceiro'],
              titulo      : fieldsArray['titulo'],
              data        : datainicio,
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
             var dataSepareted = req.body.datainicio.split(" ");
             var date = dataSepareted[0].split("/");
             var time = dataSepareted[1].split(":");
             var datainicio = new Date(date[2]+ "." + date[1]+ "." + date[0]);;
             datainicio.setHours(time[0],time[1],time[2],0);

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
      });
  }
};

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

    res.json(categorias);

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

    res.json(plataformas);

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