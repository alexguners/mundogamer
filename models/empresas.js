var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var empresaSchema = new Schema({
	_id					: Schema.Types.ObjectId,
	nome_empresa		: String,
	data_cadastro		: {type: Date},
	email				: String,
	ano_fundacao		: Number,
	localizacao			: String,
	site				: String,
	tipo				: String,
	capa_empresa		: String,
	url					: String,
	descricao_empresa	: String,
	clicks				: Number,
	views				: Number,
	_criador		: {type: Schema.ObjectId, ref: 'User'}
},{ collection: 'empresas' });
 
module.exports = mongoose.model('Empresa',empresaSchema);