var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var categoriaSchema = new Schema({
	_id				: Schema.Types.ObjectId,
	nome_categoria	: String,
	data_cadastro		: {type: Date},
	descricao_categoria	: String,
	jogos_categoria	: Number,
	_criador		: {type: Schema.ObjectId, ref: 'User'}
},{ collection: 'categorias' });
 
module.exports = mongoose.model('Categoria',categoriaSchema);