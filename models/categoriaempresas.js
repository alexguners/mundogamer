var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var categoriaempresaSchema = new Schema({
	_id				: Schema.Types.ObjectId,
	nome_categoria	: String,
	descricao_categoria	: String,
	data_cadastro		: {type: Date},
	empresas_categoria	: Number,
	_criador		: {type: Schema.ObjectId, ref: 'User'}
},{ collection: 'categoriaempresas' });
 
module.exports = mongoose.model('CategoriaEmpresa',categoriaempresaSchema);