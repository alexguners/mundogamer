// config/database.js
module.exports = {
	//Conexao Banco de Dados no endereço Mundo Gamer.com.br
	//'url' : 'mongodb://admin:sArJF_4ctG2u@'+ process.env.OPENSHIFT_MONGODB_DB_HOST+':'+process.env.OPENSHIFT_MONGODB_DB_PORT + '/core' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot'
	

	// COnexao com o Banco de dados Localhost
	'url' : 'mongodb://localhost/mundogamer' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

};
