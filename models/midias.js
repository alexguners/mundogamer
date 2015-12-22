var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var midiaSchema = new Schema({
	_id				: Schema.Types.ObjectId,
	nome_midia	: String,
	descricao_midia	: String,
	data_cadastro		: {type: Date},
	jogos_midia	: Number,
	_criador		: {type: Schema.ObjectId, ref: 'User'}
},{ collection: 'midias' });
 
module.exports = mongoose.model('Midia',midiaSchema);