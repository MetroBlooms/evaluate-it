Ext.define('EvaluateIt.model.Address', {
    extend: 'Ext.data.Model',
    //extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'address', type: 'string'},
            {name: 'city', type: 'string'},
            {name: 'state', type: 'string'},
            {name: 'zipcode', type: 'string'},
			{name: 'county', type: 'string'}
        ]
		/*proxy: {
           	type: "sql",
			database: 'Test'
        }*/

    }
});
