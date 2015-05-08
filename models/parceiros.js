var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var parceiroSchema = new Schema({
	_id				: Schema.Types.ObjectId,
	nome_parceiro		: String,
	email_contato		: String,
	url					: String,
	data_cadastro		: {type: Date},
	categoria			: String,
	site				: String,
	twitter				: String,		
	facebook			: String,
	instagram			: String,
	canal_youtube		: String,
	descricao_parceiro	: String,
	logo				: String,
	parceiro_banner01	: String,
	parceiro_banner02	: String,
	clicks				: Number,
	views				: Number,
	vinculos		    : Number,
	_criador			: {type: Schema.ObjectId, ref: 'User'}
},{ collection: 'parceiros' });
 
module.exports = mongoose.model('Parceiro',parceiroSchema);