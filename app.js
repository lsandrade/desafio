Ext.application({
	name: 'Sencha',
	launch: function(){
		
Ext.create('Ext.MessageBox').show(
        {
            title: 'Alert',
            message: 'Teste',
            height: 300,
            scrollable: true,
            buttons: Ext.MessageBox.OK
        }        
    );
	
	}
});