var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var plataformaSchema = new Schema({
	_id				: Schema.Types.ObjectId,
	nome_plataforma		: String,
	lancamento_plataforma : {type: Date},
	data_cadastro		: {type: Date},
	empresa_responsavel	: String,
	tipo_plataforma		: String,
	site_plataforma		: String,
	geracao_plataforma	: String,
	tipomidia_plataforma: Array,		
	facebook_plataforma	: String,
	twitter_plataforma	: String,
	instagram_plataforma: String,
	youtube_plataforma	: String,
	logo_plataforma		: String,
	descricao_plataforma: String,
	plataforma_banner01	: String,
	plataforma_banner02	: String,
    nome_fonte		    : String,
	url_fonte			: String,
	clicks_plataforma	: Number,
	jogos_plataforma    : Number,
	url   			    : String,
    clicks				: Number,
	views				: Number,
	noticias_plataforma	: Number,
	_criador			: {type: Schema.ObjectId, ref: 'User'}
},{ collection: 'plataformas' });
 
module.exports = mongoose.model('Plataforma',plataformaSchema);