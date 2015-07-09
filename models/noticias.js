var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var noticiaSchema = new Schema({
	_id				: Schema.Types.ObjectId,
	titulo			: String,
	//_parceiro		: {type: Schema.ObjectId, ref: 'Parceiro'},
	tipo		    : String,
	url				: String,
	data			: {type: Date},
	descricao		: String,
	img				: String,
	parceiro		: String,
	nome_fonte		: String,
	url_fonte		: String,
	tags			: [{nome: String}],
	src				: String,
	clicks			: Number,
	views			: Number,
	data_final		: {type: Date},
	_criador		: {type: Schema.ObjectId, ref: 'User'}
},{ collection: 'noticias' });
 
module.exports = mongoose.model('Noticia',noticiaSchema);


//db.noticias.insert({"titulo":"teste2", "data":db.isMaster().localTime, "descricao":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "img":"img1.jpg", "acessos":0, "data_validade":db.isMaster().localTime, "_criador":{"$ref":"system-user", "$id":new ObjectId("533350773b5fa4f0178edceb")}})


// {
//     "_id" : ObjectId("533351b86d9d4b6518a5684d"),
//     "local" : {
//         "password" : "$2a$08$fehWj9VRA726GWtYKUE1DeVE4AjZwwk3aQwJKDuQNAvwkePk.rygq",
//         "email" : "xmarcusv@gmail.com",
//         "nome" : "marcus"
//     },
//     "__v" : 0,
//     "noticias" : [{ 
//         type : Schema.Types.ObjectId, 
//         "$ref" : "users" 
//      }]
// }

