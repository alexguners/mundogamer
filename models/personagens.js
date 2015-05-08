var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var personagemSchema = new Schema({
	_id				: Schema.Types.ObjectId,
	nome_personagem			: String,
	genero_personagem		: String,
	data_nascimento			: {type: Date},
	primeirojogo_personagem	: String,
	anoprimjogo_personagem	: String,
	criador_personagem  	: String,
	profissao_personagem	: String,
	url						: String,
	origem_personagem 	    : String,
	especie_personagem		: String,
	planeta_personagem		: String,
	descricao_personagem	: String,
	capa_personagem			: String,
	personagem_banner01		: String,
	personagem_banner02		: String,
	clicks					: Number,
	views					: Number,
	num_jogos		  		: Number,
	nome_fonte				: String,
	url_fonte				: String,
	_criador				: {type: Schema.ObjectId, ref: 'User'}
},{ collection: 'personagens' });
 
module.exports = mongoose.model('Personagem',personagemSchema);