var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var coberturaSchema = new Schema({
	_id				: Schema.Types.ObjectId,
	nome_evento		: String,
	url				: String,
	ano				: Number,
	descricao		: String,
	img				: String,
	src				: String,
	situação		: Number,
	clicks			: Number,
	views			: Number,
	_criador		: {type: Schema.ObjectId, ref: 'User'}
},{ collection: 'coberturas' });
 
module.exports = mongoose.model('Cobertura',coberturaSchema);