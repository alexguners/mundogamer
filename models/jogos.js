var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var jogoSchema = new Schema({
	_id					: Schema.Types.ObjectId,
	nome_jogo			: String,
	desenvolvedor		: String,
	editora				: String,
	data_lancamento		: {type: Date},
	data_cadastro		: {type: Date},
	categoria			: String,
	tipomidia_jogo		: String,
	url					: String,
	site				: String,
	capa_jogo			: String,
	jogo_banner01		: String,
	jogo_banner02		: String,
	backgroundjogo	    : String,
	plataformas			: String,
	descricao_jogo		: String,
    nome_fonte		    : String,
	url_fonte			: String,
	clicks				: Number,
	views				: Number,
	numero_noticias	    : Number,
	_criador			: {type: Schema.ObjectId, ref: 'User'}
},{ collection: 'jogos' });
 
module.exports = mongoose.model('Jogo',jogoSchema);