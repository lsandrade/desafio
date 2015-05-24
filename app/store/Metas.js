Ext.define('Desafio.store.Metas', {
    extend: 'Ext.data.Store',
    requires: 'Desafio.model.Meta',

    config: {
        model: 'Desafio.model.Meta'
    }
});