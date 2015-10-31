/*
 * GET home page.
 */
var NoticiaModel = require('../models/noticias');
var PlataformaModel = require('../models/plataformas');
var JogoModel = require('../models/jogos');
var ParceiroModel = require('../models/parceiros');
var PersonagemModel = require('../models/personagens');
// var CoberturaModel = require('../models/coberturas');
var ObjectId = require('mongoose').Types.ObjectId; 

exports.embreve = function(req, res) {
		res.render('embreve');
	}

exports.countNoticia = function (req, res){
	NoticiaModel.update({'_id': req.body.id}, {$inc: { clicks: 1 }}).exec(function(err, noticia) {
		if (err)
			return console.error(err);	

		res.send(" ");

		});

};

exports.countViews = function (req, res){
	NoticiaModel.update({'_id': req.body.id}, {$inc: { views: 1 }}).exec(function(err, noticia) {
		if (err)
			return console.error(err);	

		res.send(" ");

		});

};

exports.aplicativos = function(req, res) {
		res.render('home/aplicativos',{
			id:0
		});
	}

exports.index = function(req, res) {

	NoticiaModel.find().limit(12).sort({ data: 'desc'}).exec(function(err, noticias) {
		if (err)
			return console.error(err);

		res.render('home/home', {
			id:1,
			noticias : noticias
		});
	});
}; 

exports.sobre = function(req, res) {
		res.render('home/sobre',{
			id:2
		});
	}

exports.wikigamer = function(req, res) {
		res.render('home/wikigamer',{
			id:3
		});
	}	

exports.contato = function(req, res) {
		res.render('home/contato',{
			id:4
		});
	}

exports.queroserparceiro = function(req, res) {
		res.render('home/queroserparceiro',{
			id:5
		});
	}

exports.plataforma = function(req, res) {

	var str = req.route.params.id;

	PlataformaModel.findOne({url:str}).populate('_criador').exec(function (err, plataforma) {
    if (err)
          return console.error(err);
		res.render('home/plataforma',
		{
			plataforma:plataforma,
			id:6
		});

	});
}

exports.plataformas = function(req, res) {
  var PlataformaModel = require('../models/plataformas');
  var ObjectId = require('mongoose').Types.ObjectId; 
  var str = req.route.params.id;
		
		PlataformaModel.find().sort({ nome_plataforma: 'asc'}).exec(function(err, plataformas){
    if (err)
          return console.error(err);

		res.render('home/plataformas',
		{
			plataformas:plataformas,
			id:7
		});

	});
}

exports.countViewsPlataformas = function (req, res){
	PlataformaModel.update({'_id': req.body.id}, {$inc: { views: 1 }}).exec(function(err, plataforma) {
		if (err)
			return console.error(err);	

		res.send(" ");

		});

};

exports.jogo = function(req, res) {

	var str = req.route.params.id;

	JogoModel.findOne({url:str}).populate('_criador').exec(function (err, jogo) {
    if (err)
          return console.error(err);
		res.render('home/jogo',
		{
			jogo:jogo,
			id:8
		});

	});
}

exports.countViewsJogos = function (req, res){
	JogoModel.update({'_id': req.body.id}, {$inc: { views: 1 }}).exec(function(err, jogo) {
		if (err)
			return console.error(err);	

		res.send(" ");

		});

};

exports.jogos = function(req, res) {
  var JogoModel = require('../models/jogos');
  var ObjectId = require('mongoose').Types.ObjectId; 
  var str = req.route.params.id;


  JogoModel.find().sort({ nome_jogo: 'asc'}).exec(function(err, jogos){
    if (err)
          return console.error(err);

		res.render('home/jogos',
		{
			jogos:jogos,
			id:9
		});

	});
}

exports.parceiro = function(req, res) {

	var str = req.route.params.id;

	ParceiroModel.findOne({url:str}).populate('_criador').exec(function (err, parceiro) {
    if (err)
          return console.error(err);
		res.render('home/parceiro',
		{
			parceiro:parceiro,
			id:10
		});

	});
}

exports.countViewsParceiros = function (req, res){
	ParceiroModel.update({'_id': req.body.id}, {$inc: { views: 1 }}).exec(function(err, parceiro) {
		if (err)
			return console.error(err);	

		res.send(" ");

		});

};

exports.parceiros = function(req, res) {
  var ParceiroModel = require('../models/parceiros');
  var ObjectId = require('mongoose').Types.ObjectId; 
  var str = req.route.params.id;


  ParceiroModel.find().sort({ nome_parceiro: 'asc'}).exec(function(err, parceiros){
    if (err)
          return console.error(err);

		res.render('home/parceiros',
		{
			parceiros:parceiros,
			id:11
		});

	});
}

exports.personagem = function(req, res) {

	var str = req.route.params.id;

	PersonagemModel.findOne({url:str}).populate('_criador').exec(function (err, personagem) {
    if (err)
          return console.error(err);
		res.render('home/personagem',
		{
			personagem:personagem,
			id:12
		});

	});
}

exports.countViewsPersonagens = function (req, res){
	PersonagemModel.update({'_id': req.body.id}, {$inc: { views: 1 }}).exec(function(err, personagem) {
		if (err)
			return console.error(err);	

		res.send(" ");

		});

};

exports.personagens = function(req, res) {
  var PersonagemModel = require('../models/personagens');
  var ObjectId = require('mongoose').Types.ObjectId; 
  var str = req.route.params.id;


  PersonagemModel.find().sort({ nome_personagem: 'asc'}).exec(function(err, personagens){
    if (err)
          return console.error(err);

		res.render('home/personagens',
		{
			personagens:personagens,
			id:13
		});

	});
}

exports.noticia = function(req, res) {

	var str = req.route.params.id;

	if( str.indexOf("-") > 0){
		NoticiaModel.findOne({url:str}).populate('_criador').populate('_parceiro').exec(function (err, noticia) {
		if (err)
			return console.error(err);

			NoticiaModel.find({_criador:noticia._criador, url:{$ne : str}}).limit(5).sort({ data: 'desc'}).exec(function(err, noticiasAutor) {
				if (err)
				return console.error(err);	

				res.render('home/noticia', {
					id:14,
					noticia : noticia,
					noticiasAutor : noticiasAutor
				});

			});
		});

	}else {

		NoticiaModel.findOne({_id:new ObjectId(req.route.params.id)}).populate('_criador').populate('_parceiro').exec(function (err, noticia) {
		if (err)
			return console.error(err);

			NoticiaModel.find({_criador:noticia._criador, _id:{$ne : new ObjectId(req.route.params.id)}}).limit(3).sort({ data: 'desc'}).exec(function(err, noticiasAutor) {
				if (err)
				return console.error(err);

			console.log(noticiasAutor);			

				res.render('home/noticia', {
					id:15,
					noticia : noticia,
					noticiasAutor : noticiasAutor
				});

			});
		});

	}	
};

exports.login = function(req, res) {
		res.render('home/login',{
			id:16
		});
	}


// exports.cobertura = function(req, res) {

// 	var str = req.route.params.id;

// 	CoberturaModel.findOne({url:str}).populate('_criador').exec(function (err, cobertura) {
//     if (err)
//           return console.error(err);
// 		res.render('home/cobertura',
// 		{
// 			cobertura:cobertura,
// 			id:17
// 		});

// 	});
// }

// exports.countViewsCoberturas = function (req, res){
// 	CoberturaModel.update({'_id': req.body.id}, {$inc: { views: 1 }}).exec(function(err, cobertura) {
// 		if (err)
// 			return console.error(err);	

// 		res.send(" ");

// 		});

// };

// exports.coberturas = function(req, res) {
//   var CoberturaModel = require('../models/coberturas');
//   var ObjectId = require('mongoose').Types.ObjectId; 
//   var str = req.route.params.id;


//   CoberturaModel.find().sort({ nome: 'asc'}).exec(function(err, coberturas){
//     if (err)
//           return console.error(err);

// 		res.render('home/coberturas',
// 		{
// 			coberturas:coberturas,
// 			id:18
// 		});

// 	});
// }


exports.contatoEmail = function(req, res) {

		var nodemailer = require("nodemailer");

		var transport = nodemailer.createTransport("SMTP", {
		    host: "mx.mundogamer.com.br", // hostname
		    port: 587, // port for secure SMTP
		    auth: {
		        user: "contato@mundogamer.com.br",
		        pass: "asdf1234"
    	}});

    	
		var validarEmail = function(){
			var nome = document.getElementById('nome');
			var email = document.getElementById('email');
			var textarea = document.getElementById('mensagem');
			alert(nome);


		}
    	transport.sendMail({  //email options
		   from: req.body.nome + " <" + req.body.email + ";>", // sender address.  Must be the same as authenticated user if using GMail.
		   to: "<contato@mundogamer.com.br", // receiver
		   subject: req.body.herolist, // subject
		   text: req.body.mensagem // body
		}, function(error, response){  //callback
		   if(error){
		       res.render('home/contato',{
					id:4,
					message:"Erro ao enviar e-mail"
				});
		   }else{
		       res.render('home/contato',{
					id:4,
					message:"E-mail enviado com sucesso"
				});
		   }
		   
		   transport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
		});


	}

exports.load = function(req, res) {
		var start = req.route.params.start;

		NoticiaModel.find().skip(start).limit(12).sort({ data: 'desc'}).exec(function (err, noticias) {
		if (err)
			return console.error(err);

		res.json(noticias);

	});


	}



exports.save = function(req, res) {
	 	var User       = require('../models/user');
	// 	User.findOne({"local.email" : "xmarcusv@gmail.com"}, function (err, usuario) {
	// 		console.log("usuario ", usuario.id);
	// 		var not = new NoticiaModel({
	// 			"_id"	: new ObjectId(),
	// 		    "titulo" : "noticia com usuario",
	// 		    "data" : new Date(),
	// 		    "descricao" : "aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa",
	// 		    "img" : "img1.jpg",
	// 		    "acessos" : 0,
	// 		    "data_validade" : new Date(),
	// 		    "tags" : [{"nome":"tag12"},{"nome":"tag13"}],
	// 		    "_criador" : usuario.id
	// 		});

	// 		not.save(function (err) {
	// 		    if (err) return console.error(err);
	// 		    // thats it!
	// 		  });

	// });

	// NoticiaModel
	// .findOne({ _id:new ObjectId("5334800210024f9a27778575") })
	// .populate('_criadorfunction')
	// .exec(function (err, noticia) {
	//   if (err) console.error(err);
	//   console.log('The creator is %s', noticia._criador);
	//   // prints "The creator is Aaron"
	// })

	// User.update({"local.email" : "xmarcusv@gmail.com"},{ noticias: [{_id:new ObjectId("5334800210024f9a27778575")}]},
	// 	{ multi: false }, 
	// 	function (err, numberAffected, raw) {

	// 	if (err) console.error(err);

	// 	 console.log('The number of updated documents was %d', numberAffected);
 // 		 console.log('The raw response from Mongo was ', raw);

	// });

	// User
	// .findOne({"local.email" : "xmarcusv@gmail.com" })
	// .populate('noticias')
	// .exec(function (err, user) {
	//   if (err) console.error(err);
	//   console.log('The creator is %s', user.noticias[0].titulo);
	//   // prints "The creator is Aaron"
	// })


}

exports.convertAll = function(req, res) {
	NoticiaModel.find({}).exec(function(err, noticias) {
		if (err)
			return console.error(err);

		for(var i = 0; i < noticias.length; i++){
			var title = titleToUrl(noticias[i].titulo);
			NoticiaModel.update({'_id':noticias[i].id}, {url:title}).exec(function(err, noticia) {
			if (err)
				return console.error(err);	

			console.log("updated");

			});
		}

		res.send("ok");
	});	

	JogoModel.find({}).exec(function(err, jogos) {
		if (err)
			return console.error(err);

		for(var i = 0; i < jogos.length; i++){
			var title = titleToUrlWiki(jogos[i].nome_jogo);
			JogoModel.update({'_id':jogos[i].id}, {url:title}).exec(function(err, jogo) {
			if (err)
				return console.error(err);	

			console.log("updated");

			});
		}

		res.send("ok");
	});	

		PlataformaModel.find({}).exec(function(err, plataformas) {
		if (err)
			return console.error(err);

		for(var i = 0; i < plataformas.length; i++){
			var title = titleToUrlWiki(plataformas[i].nome_plataforma);
			PlataformaModel.update({'_id':plataformas[i].id}, {url:title}).exec(function(err, plataforma) {
			if (err)
				return console.error(err);	

			console.log("updated");

			});
		}

		res.send("ok");
	});	

		ParceiroModel.find({}).exec(function(err, parceiros) {
		if (err)
			return console.error(err);

		for(var i = 0; i < parceiros.length; i++){
			var title = titleToUrlWiki(parceiros[i].nome_parceiro);
			ParceiroModel.update({'_id':parceiros[i].id}, {url:title}).exec(function(err, parceiro) {
			if (err)
				return console.error(err);	

			console.log("updated");

			});
		}

		res.send("ok");
	});	
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
    // return newStr;
    return newStr.replace(/[^a-zA-Z 0-9]/g, '');
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
