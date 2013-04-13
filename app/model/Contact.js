Ext.define('EvaluateIt.model.Contact', {
    extend: 'Ext.data.Model',
    config: {
        //fields: ['firstName', 'lastName']
		fields: ['category', 'str'],
		proxy: {
      		type: 'localstorage',
         	id  : 'produceKey'
     	}

    }
});
