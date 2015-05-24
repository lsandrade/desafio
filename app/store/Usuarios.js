Ext.define('Desafio.store.Usuarios', {
    extend: 'Ext.data.Store',
    requires: 'Desafio.model.Usuario',

    config: {
        model: 'Desafio.model.Usuario'
    }
});