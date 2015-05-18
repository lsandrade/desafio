//Model Usuario
Ext.define('Usuario',{
	extend: 'Ext.data.Model',
	config:{
		fields: [
			{name: 'id', type:'int'},
			{name: 'nome',  type: 'string'},
			{name: 'sobrenome', type: 'string'},
			{name: 'foto',  type: 'string'},
			{name: 'senha',  type: 'string'}
		],
		proxy:{
			type: 'localstorage',
			id: 'usuario'
		},
		//autoLoad: true,
		hasMany: {model: 'Projeto', foreignKey:'usuario_id'}
		//hasOne: {model: 'Endereco', foreignKey:'contato_id'} //tem UM endereço
	}

});