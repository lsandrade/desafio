Ext.define('Desafio.store.Projetos', {
    extend: 'Ext.data.Store',
    requires: 'Desafio.model.Projeto',

    config: {
        model: 'Desafio.model.Projeto'
    }
});