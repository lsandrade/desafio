//Model Projeto
Ext.define('Desafio.model.Projeto',{
	extend: 'Ext.data.Model',
	config:{
		fields: [
			{name: 'id', type:'int'},
			{name: 'titulo',  type: 'string'},
			{name: 'descricao', type: 'string'},
			{name: 'cor',  type: 'string'},
			{name: 'usuario_id',  type: 'int'}
		],
		proxy:{
			type: 'localstorage',
			id: 'projeto'
		},
		//autoLoad: true,
		hasMany: {model: 'Meta', foreignKey:'projeto_id'},
		belongsTo: {model: 'Usuario'}
	}

});