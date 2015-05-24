//Model Meta
Ext.define('Desafio.model.Meta',{
	extend: 'Ext.data.Model',
	config:{
		fields: [
			{name: 'id', type:'int'},
			{name: 'data',  type: 'date'},
			{name: 'cumpriu', type: 'boolean'},
			{name: 'projeto_id',  type: 'int'}
		],
		proxy:{
			type: 'localstorage',
			id: 'usuario'
		},
		//autoLoad: true,
		belongsTo: {model: 'Projeto'}
	}

});